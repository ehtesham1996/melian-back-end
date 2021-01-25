import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SpecialityModule } from '../speciality/speciality.module';
import { AllergyModule } from '../allergy/allergy.module';
import { NetworkModule } from '../network/network.module';
import { AddictionModule } from '../addiction/addiction.module';
import { PathologyModule } from '../pathology/pathology.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot( process.env.db_uri || 'mongodb://localhost:27017/melian', {
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: true
    }),
    GraphQLModule.forRootAsync({
      useFactory: () => {
        const schemaModuleOptions: any = {
          // mocks: true
        };

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
    AllergyModule,
    AddictionModule,
    PathologyModule,
    SpecialityModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
