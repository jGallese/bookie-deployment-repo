import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  books?: string[];
}

export type BookshelfDocument = Bookshelf & Document;

export const BookshelfSchema = SchemaFactory.createForClass(Bookshelf);
