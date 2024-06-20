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

  create(createBookInput: CreateBookInput) {
    return 'This action adds a new book';
  }

  findAll() {
    return `This action returns all books`;
  }

  async searchBooks(query: string) {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${this.googleBooksApiKey}`,
    );
    const data = await response.json();
    return data.items.map((item) => ({
      _id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      description: item.volumeInfo.description,
      image: item.volumeInfo.imageLinks,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
