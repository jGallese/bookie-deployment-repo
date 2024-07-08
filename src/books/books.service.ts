import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
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
    console.log(data);
    if (!data.items) {
      return {
      _id: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors,
      description: data.volumeInfo.description,
      image: data.volumeInfo.imageLinks,
      categories: data.volumeInfo.categories,
      };
    }
    return data.items.map((item) => ({
      _id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      description: item.volumeInfo.description,
      image: item.volumeInfo.imageLinks,
      categories: item.volumeInfo.categories,
    }));
  }

  async mapDataAuthorToReturn(response: Response) {
    const data =  await response.json();
    console.log(data.docs)
    return data.docs.map((item) => ({
      _id: item.key,
      name: item.name,
      top_work: item.top_work,
    }));
  }

  async mapDataGenreToReturn(response: Response) {
    const data =  await response.json();
    console.log(data.docs)
    return data.docs.map((item) => ({
      _id: item.key,
      name: item.name,
    }));
  }

  create(createBookInput: CreateBookInput) {
    return 'This action adds a new book';
  }

  findAll() {
    return `This action returns all books`;
  }

  async searchBooks(query: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${this.googleBooksApiKey}`,
      );
      console.log(response);
      return await this.mapDataItemsToReturn(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchBooksByGender(gender: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=+subject:${gender}&key=${this.googleBooksApiKey}`,
      );

      return await this.mapDataItemsToReturn(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchBooksByAuthor(author: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=+inauthor:${author}&key=${this.googleBooksApiKey}`,
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
      return await this.mapDataItemsToReturn(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
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
}
