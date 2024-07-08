import { Module } from '@nestjs/common';
import { BookshelvesService } from './bookshelves.service';
import { BookshelvesResolver } from './bookshelves.resolver';
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
  providers: [BookshelvesService, BookshelvesResolver],
})
export class BookshelvesModule {}
