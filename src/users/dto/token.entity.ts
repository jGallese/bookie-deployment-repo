import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserToken {

  @Field(() => User)
  user: User;

  @Field(() => String)
    token: string;
}

export type TokenComponent = UserToken & Document;

