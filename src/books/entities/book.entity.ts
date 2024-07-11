import { Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@ObjectType()
class BookImage {
  @Field({ nullable: true })
  thumbnail?: string;

  @Field({ nullable: true })
  small?: string;

  @Field({ nullable: true })
  smallThumbnail?: string;
}

@ObjectType()
@Schema()
export class Book {
  @Field(() => String)
  _id: string; //

  @Prop()
  @Field()
  title: string;

  @Prop()
  @Field(() => [String], { nullable: true })
  authors?: string[];

  @Prop()
  @Field(() => [String], { nullable: true })
  categories?: string[];

  @Prop()
  @Field({ nullable: true })
  description?: string;

  @Prop()
  @Field(() => BookImage, { nullable: true })
  image?: BookImage;

  @Prop()
  @Field(() => [String], { nullable: true })
  category?: string[];

  @Prop()
  @Field(() => String, { nullable: true })
  ISBN?: string;
}

export type UserDocument = Book & Document;

export const BookSchema = SchemaFactory.createForClass(Book);
