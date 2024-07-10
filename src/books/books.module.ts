import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreSchema } from './entities/genre.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Genre', schema: GenreSchema }]),
  ],
  exports: [BooksService],
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
