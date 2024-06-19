import { InputType, Field } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

@InputType()
export class GetUserInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  username: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  lastname: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;
  @Exclude()
  pass: string;
}
