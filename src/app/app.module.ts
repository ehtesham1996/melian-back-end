import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UserModule } from '../user/user.module';
import { HobbyModule } from '../hobby/hobby.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpecialityModule } from 'src/speciality/speciality.module';
// import { UsersModule } from './users/users.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/melian', {
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: true
    }),
    GraphQLModule.forRoot({
      // typePaths: ['./**/*.graphql'],
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.ts'),
      //   outputAs: 'class'
      // },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
      context: ({ req }) => ({ headers: req.headers }),
      formatError: (err) => {
        return { message: err.message, code: err.extensions?.exception?.status || 500 };

      }
    }),
    HobbyModule,
    UserModule,
    SpecialityModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
