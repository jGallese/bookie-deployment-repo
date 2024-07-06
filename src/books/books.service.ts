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
    return data.items.map((item) => {
      const book = {
        _id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        imageLinks: item.volumeInfo.imageLinks,
        category: item.volumeInfo.categories,
      };
      return book;
    });
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

      const book = {
        _id: data.id,
        title: data.volumeInfo.title,
        authors: data.volumeInfo.authors,
        description: data.volumeInfo.description,
        imageLinks: data.volumeInfo.imageLinks,
        category: data.volumeInfo.categories,
      };
      return book;
    } catch (error) {
      throw new Error(error);
    }
  }
}
