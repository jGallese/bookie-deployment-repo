import { Injectable } from '@nestjs/common';
import { envs } from 'config/envs.config';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  private readonly googleBooksApiKey: string;

  constructor() {
    this.googleBooksApiKey = envs.GOOGLE_BOOKS_APIKEY;
  }

  async mapDataItemsToReturn(response: Response) {
    const data = await response.json();
    return data.items.map(
      (item) =>
        new Book(
          item.id,
          item.volumeInfo.title,
          item.volumeInfo.authors,
          item.volumeInfo.description,
          item.volumeInfo.imageLinks,
          item.volumeInfo.categories[0],
        ),
    );
  }

  async searchBooksByName(query: string) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${this.googleBooksApiKey}`,
      );
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
      const data = await response.json();

      return new Book(
        data.id,
        data.volumeInfo.title,
        data.volumeInfo.authors,
        data.volumeInfo.description,
        data.volumeInfo.imageLinks,
        data.volumeInfo.categories[0],
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
