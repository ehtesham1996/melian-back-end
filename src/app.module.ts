import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoService } from './dynamo/dynamo.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/service/auth.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, DynamoService, AuthService]
})
export class AppModule {}
