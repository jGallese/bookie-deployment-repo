import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Bookshelf } from './entities/bookshelf.entity';
import { BookshelfsService } from './bookshelfs.service';
import { CreateBookshelfInput } from './dto/create-bookshelf.input';
import { UpdateBookshelfInput } from './dto/update.bookshelf.input';

@Resolver(() => Bookshelf)
export class BookshelfsResolver {
  constructor(private readonly bookshelfService: BookshelfsService) {}

  @Query(() => [Bookshelf])
  async findAll() {
    return this.bookshelfService.findAll();
  }

  @Query(() => Bookshelf, { name: 'bookshelf' })
  async findOne(@Args('id') id: number) {
    return this.bookshelfService.findOne(id);
  }

  @Mutation(() => Bookshelf)
  async createBookshelf(
    @Args('createBookshelfDto') createBookshelfDto: CreateBookshelfInput,
  ) {
    return this.bookshelfService.create(createBookshelfDto);
  }

  @Mutation(() => Bookshelf)
  async updateBookshelf(
    @Args('updateBookshelfDto') updateBookshelfDto: UpdateBookshelfInput,
  ) {
    return this.bookshelfService.update(
      updateBookshelfDto.id,
      updateBookshelfDto,
    );
  }

  @Mutation(() => Boolean)
  async removeBookshelf(@Args('id') id: number) {
    await this.bookshelfService.remove(id);
    return true;
  }
}
