import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SpecialityModule } from '../speciality/speciality.module';
import { NetworkModule } from '@src/network/network.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/melian', { //process.env.db_uri ||
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: true
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => {
        const schemaModuleOptions: any = {};

        // If we are in development, we want to generate the schema.graphql
        if (process.env.ENV == 'local') {
          schemaModuleOptions.autoSchemaFile = 'src/schema.gql';
          schemaModuleOptions.sortSchema = true;
        } else if (process.env.ENV == 'prod' || process.env.ENV == 'dev' || process.env.IS_OFFLINE) {
          //   // For production or sls offline the file should be generated
          schemaModuleOptions.typePaths = ['src/schema.gql'];
        }
        return {
          context: ({ req }) => ({ headers: req.headers }),
          playground: {
            endpoint: process.env.ENV == 'local' ? '/graphql' : `/${process.env.ENV}/graphql`
          },
          introspection: true, // Allow introspection in production
          debug: false,
          ...schemaModuleOptions,
          // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
          formatError: (err) => {
            return { message: err.message, code: err.extensions?.exception?.status || 500 };

          }
        };
      }
    }),
    UserModule,
    NetworkModule,
    SpecialityModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
