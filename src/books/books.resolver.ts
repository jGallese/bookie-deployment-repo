import { Resolver, Query, Args } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Author } from './entities/author.entity';
import { Genre } from './entities/genre.entity';

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

  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.booksService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.remove(id);
  }

  @Query(()=> [Author])
  searchAuthor(@Args('query') query: string) {
    return this.booksService.searchAuthors(query);
  }

  @Query(()=> [Genre])
  searchGenres(@Args('query') query: string) {
    return this.booksService.searchGenres(query);
  }
}
