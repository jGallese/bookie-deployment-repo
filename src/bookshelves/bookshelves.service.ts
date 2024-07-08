import { Injectable } from '@nestjs/common';
import { Bookshelf } from './entities/bookshelf.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookshelfInput } from './dto/create-bookshelf.input';
import { UpdateBookshelfInput } from './dto/update.bookshelf.input';

@Injectable()
export class BookshelvesService {
  constructor(
    @InjectModel(Bookshelf.name) private bookshelfModel: Model<Bookshelf>,
  ) {}

  async create(createBookshelfDto: CreateBookshelfInput): Promise<Bookshelf> {
    const createdBookshelf = new this.bookshelfModel(createBookshelfDto);
    return createdBookshelf.save();
  }

  async findAll(): Promise<Bookshelf[]> {
    return this.bookshelfModel
      .find()
      .populate('idUser')
      .populate('books')
      .exec();
  }

  async findOne(id: number): Promise<Bookshelf> {
    return (await this.bookshelfModel.findOne({ id }).populate('idUser'))
      .populated('books')
      .exec();
  }

  async update(
    id: number,
    updateBookshelfDto: UpdateBookshelfInput,
  ): Promise<Bookshelf> {
    return this.bookshelfModel
      .findByIdAndUpdate({ id }, updateBookshelfDto, { new: true })
      .populate('idUser')
      .populate('books')
      .exec();
  }

  async remove(id: number): Promise<Bookshelf> {
    return this.bookshelfModel.findOneAndDelete({ id }).exec();
  }
}
