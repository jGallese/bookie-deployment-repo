import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Book } from 'src/books/entities/book.entity';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Bookshelf {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true, unique: true })
  name: string;

  @Field(() => String, { nullable: false })
  @Prop({ type: String })
  idUser: string;

  @Field(() => [Book], { nullable: true })
  @Prop({ type: [{ type: String, ref: 'Book' }], default: [] })
  books?: Book[];
}

export type BookshelfDocument = Bookshelf & Document;

export const BookshelfSchema = SchemaFactory.createForClass(Bookshelf);
