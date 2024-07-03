import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { type } from 'os';

export enum Category {
    AUTHOR = 'author',
    GENRE = 'genre',
    BOOK = 'book'
    }

typeof registerEnumType(Category, {
        name: 'Category', // Nombre que será usado en el esquema GraphQL
      });

@ObjectType()
export class Interest {
  @Field(() => Number)
  points: number;

  @Field(() => String)
  keyword: string;

  @Field(type => Category)
  category: Category;
}

export type InterestDocument = Interest & Document;
