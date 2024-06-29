import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Field(() => String, { description: 'Lastname of the user' })
  lastname: string;

  @Field(() => Date, { description: 'Birthdate of the user' })
  birthDate: Date;
}
