import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateBookshelfInput {
  @Field()
  name: string;

  @Field(() => [ID], { nullable: true })
  books?: string[];
}
