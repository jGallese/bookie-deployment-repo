import { Injectable } from '@nestjs/common';
import { Bookshelf, BookshelfDocument } from './entities/bookshelf.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookshelfInput } from './dto/create-bookshelf.input';
import { UpdateBookshelfInput } from './dto/update.bookshelf.input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BookshelvesService {
  constructor(
    @InjectModel(Bookshelf.name)
    private bookshelfModel: Model<BookshelfDocument>,
    private usersService: UsersService,
  ) {}

  async createBookshelf(
    createBookshelfDto: CreateBookshelfInput,
    context: any,
  ): Promise<Bookshelf> {
    const { name } = createBookshelfDto;
    const user = await this.usersService.getMyUser(context);

    const createdBookshelf = await this.bookshelfModel.create({
      name,
      idUser: user._id,
    });
    return createdBookshelf;
  }

  async findAllUserBookshelves(context): Promise<Bookshelf[]> {
    const user = await this.usersService.getMyUser(context);
    return this.bookshelfModel
      .find({
        idUser: user._id,
      })
      .populate('books')
      .exec();
  }

  async findOne(name: string, context): Promise<Bookshelf> {
    const user = await this.usersService.getMyUser(context);
    return (await this.bookshelfModel.findOne({ name, idUser: user._id }))
      .populated('books')
      .exec();
  }

  async updateBookshelf(
    updateBookshelfDto: UpdateBookshelfInput,
  ): Promise<Bookshelf> {
    return this.bookshelfModel
      .findByIdAndUpdate(updateBookshelfDto._id, updateBookshelfDto, {
        new: true,
      })
      .populate('books')
      .exec();
  }

  async removeBookshelf(id: number): Promise<Bookshelf> {
    return this.bookshelfModel.findOneAndDelete({ id }).exec();
  }
}
