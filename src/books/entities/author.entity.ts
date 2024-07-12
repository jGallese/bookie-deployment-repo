import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(() => String)
  _id: string;

    @Field()
    name: string;

    @Field({nullable: true})
    top_work: string;
}

export type AuthorDocument = Author & Document;
