import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateBookshelfInput } from './create-bookshelf.input';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class UpdateBookshelfInput extends PartialType(CreateBookshelfInput) {
  @Field(() => Int)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => ID, { nullable: true })
  idUser?: string;

  @Field(() => [ID], { nullable: true })
  books?: string[];
}
