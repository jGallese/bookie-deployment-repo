import { Injectable } from '@nestjs/common';
import { envs } from 'config/envs.config';
import { Genre, GenreDocument } from './entities/genre.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  private readonly googleBooksApiKey: string;

  constructor(
    @InjectModel(Genre.name)
    private genreModel: Model<GenreDocument>,
  ) {
    this.googleBooksApiKey = envs.GOOGLE_BOOKS_APIKEY;
  }

  async mapDataItemsToReturn(response: Response) {
    const data = await response.json();
    if (!data.items) {
      return {
        _id: data.id,
        title: data.volumeInfo.title,
        authors: data.volumeInfo.authors,
        description: data.volumeInfo.description,
        image: data.volumeInfo.imageLinks,
        categories: data.volumeInfo.categories,
        ISBN: data.volumeInfo.industryIdentifiers? data.volumeInfo.industryIdentifiers[0].identifier : null,

      };
    }
    return data.items.map((item) => ({
      _id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      description: item.volumeInfo.description,
      image: item.volumeInfo.imageLinks,
      categories: item.volumeInfo.categories,
      ISBN: item.volumeInfo.industryIdentifiers? item.volumeInfo.industryIdentifiers[0].identifier : null,
    }));
  }

  async mapDataAuthorToReturn(response: Response) {
    const data =  await response.json();
    return data.docs.map((item) => ({
      _id: item.key,
      name: item.name,
      top_work: item.top_work,
    }));
  }

  async mapDataGenreToReturn(response: Response) {
    const data =  await response.json();
    return data.docs.map((item) => ({
      _id: item.key,
      name: item.name,
    }));
  }

  async searchBooksByTitle(query: string, startIndex: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${this.googleBooksApiKey}&startIndex=${startIndex}`,
      );
      return await this.mapDataItemsToReturn(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchBooksByGenre(query: string, startIndex: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=+subject:${query}&key=${this.googleBooksApiKey}&startIndex=${startIndex}`,
      );

      return await this.mapDataItemsToReturn(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchBooksByAuthor(query: string, startIndex: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=+inauthor:${query}&key=${this.googleBooksApiKey}&startIndex=${startIndex}`,
      );

      return await this.mapDataItemsToReturn(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${this.googleBooksApiKey}`,
      );

      const book = this.mapDataItemsToReturn(response);
      return book;
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchAuthors(query: string) {	
    try {
      const response = await fetch(`https://openlibrary.org/search/authors.json?q=${query}&lang=es`);
      return await this.mapDataAuthorToReturn(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchGenres(query: string) {
    /*try {
      const response = await fetch(`https://openlibrary.org/search/subjects.json?q=${query}&lang=es`);
      return await this.mapDataGenreToReturn(response);
    } catch (error) {
      throw new Error(error);
    }*/

    return this.genreModel.find({nameSpanish: { $regex: query, $options: 'i' }});

  }

  async saveGenre(genre: string) {
    const savedGenre = await this.genreModel.findOne({name: genre}).exec();
    if (savedGenre) {
      return savedGenre.name;
    }
    const newGenre = new this.genreModel({name: genre, nameSpanish: "No traducido"});
    return genre;
  }

  async getAllGenres() {
    return await this.genreModel.find();
  }
}
