import { Module } from '@nestjs/common';
import { BookshelfsService } from './bookshelfs.service';
import { BookshelfsResolver } from './bookshelfs.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookshelf, BookshelfSchema } from './entities/bookshelf.entity';
import { Book, BookSchema } from 'src/books/entities/book.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookshelf.name, schema: BookshelfSchema },
    ]),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [BookshelfsService, BookshelfsResolver],
})
export class BookshelfsModule {}
