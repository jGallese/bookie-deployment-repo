import { Args, Resolver, Query, Mutation, Context } from '@nestjs/graphql';
import { Bookshelf } from './entities/bookshelf.entity';
import { BookshelvesService } from './bookshelves.service';
import { CreateBookshelfInput } from './dto/create-bookshelf.input';
import { UpdateBookshelfInput } from './dto/update.bookshelf.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Bookshelf)
export class BookshelvesResolver {
  constructor(private readonly bookshelfService: BookshelvesService) {}

  @Query(() => [Bookshelf], { name: 'bookshelves' })
  @UseGuards(GqlAuthGuard)
  async findAllUserBookshelves(@Context() context) {
    return this.bookshelfService.findAllUserBookshelves(context);
  }

  @Query(() => Bookshelf, { name: 'bookshelf' })
  @UseGuards(GqlAuthGuard)
  async findOne(@Args('name') name: string, @Context() context) {
    return this.bookshelfService.findOne(name, context);
  }

  @Mutation(() => Bookshelf, { name: 'createBookshelf' })
  @UseGuards(GqlAuthGuard)
  async createBookshelf(
    @Args('createBookshelfDto') createBookshelfDto: CreateBookshelfInput,
    @Context() context,
  ) {
    return this.bookshelfService.createBookshelf(createBookshelfDto, context);
  }

  @Mutation(() => Bookshelf, { name: 'updateBookshelf' })
  @UseGuards(GqlAuthGuard)
  async updateBookshelf(
    @Args('updateBookshelfDto') updateBookshelfDto: UpdateBookshelfInput,
  ) {
    return this.bookshelfService.updateBookshelf(updateBookshelfDto);
  }

  @Mutation(() => Boolean, { name: 'removeBookshelf' })
  async removeBookshelf(@Args('id') id: number) {
    await this.bookshelfService.removeBookshelf(id);
    return true;
  }
}
