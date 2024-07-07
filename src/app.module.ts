import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { envs } from '../config/envs.config';
import { BooksModule } from './books/books.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { BookshelfsModule } from './bookshelfs/bookshelfs.module';

@Module({
  imports: [
    MongooseModule.forRoot(envs.MONGO_URL, {
      dbName: envs.MONGO_DB_NAME,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UsersModule,
    BooksModule,
    BookshelfsModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
