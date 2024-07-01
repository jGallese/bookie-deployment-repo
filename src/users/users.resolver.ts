import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SignUpDto } from './dto/signup.dto';
import { UserToken } from './dto/token.entity';
import { LoginDto } from './dto/login.dto';
import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => UserToken, { name: 'signup' })
  signup(@Args('signUpDto') signUpDto: SignUpDto) {
    return this.usersService.signup(signUpDto);
  }

  @Mutation(() => UserToken, { name: 'login' })
  login(@Args('loginDto') LoginDto: LoginDto) {
    return this.usersService.login(LoginDto);
  }

  @Query(() => User, { name: 'myUser' })
  //@UseGuards(GqlAuthGuard) -> lo comentamos porque no muestra bien la especificacion de los errores
  getMyUser(@Context() context) {
    return this.usersService.getMyUser(context);
  }

  @Mutation(() => User, { name: 'updateMyUser' })
  @UseGuards(GqlAuthGuard)
  updateMyUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context() context,
  ) {
    return this.usersService.updateMyUser(updateUserInput, context);
  }
}
