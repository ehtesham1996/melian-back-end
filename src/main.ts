import { NestFactory } from '@nestjs/core';
import 'source-map';
import { AppModule } from './app/app.module';
import * as uploadFile from 'express-fileupload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(uploadFile());
  await app.listen(3000);
}
bootstrap();
