import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  username: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  lastname: string;
  @Field(() => Date, { description: 'Example field (placeholder)' })
  birthDate: Date;
  @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  pass: string;
}
