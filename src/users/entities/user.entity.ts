import { Date, Schema as MongooseSchema } from 'mongoose';
import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { isNullableType } from 'graphql';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String)
  username: string;

  @Prop()
  @Field(() => String, { nullable: true })
  name: string;

  @Prop()
  @Field(() => String, { nullable: true })
  lastname: string;

  @Prop()
  @Field(() => String)
  @Exclude()
  pass: string;

  @Prop({ type: Date })
  @Field(() => GraphQLISODateTime, { nullable: true })
  birthDate: Date;

  @Prop({unique: [true, 'Duplicate Email entered']})
  @Field(() => String)
  email: string;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Address' })
  // @Field(() => Address)
  // address: Address;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Bookshelf' })
  // @Field(() => [Bookshelf], { nullable: 'items' })
  // idBookshelf: MongooseSchema.Types.ObjectId[];

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Interests' })
  // @Field(() => Interests)
  // idInterests: Interests;

  // @Prop()
  // @Field(() => String)
  // Image: String;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
