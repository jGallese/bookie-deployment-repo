import { Resolver, Query, Args } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => Book)
  searchBookById(@Args('id', { type: () => String }) id: string) {
    return this.booksService.findOne(id);
  }

  @Query(() => [Book])
  async searchBooksByTitle(@Args('query') query: string) {
    return this.booksService.searchBooksByTitle(query);
  }

  @Query(() => [Book])
  async searchBooksByGenre(@Args('query') query: string) {
    return this.booksService.searchBooksByGenre(query);
  }

  @Query(() => [Book])
  async searchBooksByAuthor(@Args('query') query: string) {
    return this.booksService.searchBooksByAuthor(query);
  }
}
