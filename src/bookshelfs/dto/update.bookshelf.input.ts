import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateBookshelfInput } from './create-bookshelf.input';

@InputType()
export class UpdateBookshelfInput extends PartialType(CreateBookshelfInput) {
  @Field(() => Int)
  id: number;

  @Field(() => ID, { nullable: true })
  idUser?: string;

  @Field(() => [ID], { nullable: true })
  books?: string[];
}
