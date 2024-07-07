import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Book } from 'src/books/entities/book.entity';

@ObjectType()
@Schema()
export class Bookshelf extends Document {
  @Field(() => Int)
  @Prop({ required: true, unique: true })
  _id: number;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => String)
  @Prop({ required: true })
  description: string;

  @Field(() => [ID], { nullable: false })
  @Prop({ type: String, ref: 'User' })
  idUser: string;

  @Field(() => [Book], { nullable: true })
  @Prop({ type: [{ type: String, ref: 'Book' }], default: [] })
  books?: Book[];
}

export const BookshelfSchema = SchemaFactory.createForClass(Bookshelf);
