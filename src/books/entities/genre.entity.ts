import { Field, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';



@ObjectType()
@Schema()
export class Genre {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  nameSpanish: string;
}

export type GenreDocument = Genre & Document;

export const GenreSchema = SchemaFactory.createForClass(Genre);
