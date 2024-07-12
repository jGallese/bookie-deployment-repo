import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '../../config/envs.config';
import { BooksModule } from 'src/books/books.module';
import { BooksService } from 'src/books/books.service';
import { Genre, GenreSchema } from 'src/books/entities/genre.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema },
    { name: 'Genre', schema: GenreSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envs.JWT_SECRET,
      signOptions: { expiresIn: envs.JWT_EXPIRES_IN },
    }),
    BooksModule,
  ],
  exports: [UsersService, UsersResolver, PassportModule],
  providers: [UsersService, UsersResolver, User, BooksService, Genre],
})
export class UsersModule {}
