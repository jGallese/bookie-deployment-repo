import {IsNotEmpty, IsString, IsEmail, MinLength, IsNumber} from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Category } from '../entities/interest.entity';

@InputType()
export class InterestDto {
    @Field(() => Number)
    @IsNotEmpty()
    @IsNumber()
    points: number;
  
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    keyword: string;
  
    @Field(() => Category)
    @IsNotEmpty()
    @IsString()
    category: Category;
}