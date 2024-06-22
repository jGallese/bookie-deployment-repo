import {IsNotEmpty, IsString, IsEmail, MinLength} from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class SignUpDto {
  @Field(() => String, { description: 'Username' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @Field(() => String, { description: 'Email' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email'})
  readonly email: string;

  @Field(() => String, { description: 'Password'})
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly pass: string;
}