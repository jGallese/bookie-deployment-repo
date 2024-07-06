import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
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
      };
    }
    return data.items.map((item) => ({
      _id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      description: item.volumeInfo.description,
      image: item.volumeInfo.imageLinks,
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
}
