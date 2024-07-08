import { Injectable } from '@nestjs/common';
import { envs } from 'config/envs.config';

@Injectable()
export class BooksService {
  private readonly googleBooksApiKey: string;

  constructor() {
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
        ISBN: data.volumeInfo.industryIdentifiers[0].identifier,

      };
    }
    return data.items.map((item) => ({
      _id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      description: item.volumeInfo.description,
      image: item.volumeInfo.imageLinks,
      categories: item.volumeInfo.categories,
      ISBN: item.volumeInfo.industryIdentifiers[0].identifier,
    }));
  }

  async searchBooksByTitle(query: string) {
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

  async searchBooksByGenre(query: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=+subject:${query}&key=${this.googleBooksApiKey}`,
      );

      return await this.mapDataItemsToReturn(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchBooksByAuthor(query: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=+inauthor:${query}&key=${this.googleBooksApiKey}`,
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
}
