import { APIGatewayProxyHandler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import { INestApplication } from '@nestjs/common';
import 'swagger-ui-express';
import 'source-map';
import { AppModule } from './app/app.module';

let cachedServer: Server;

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

function setupSwagger(app: INestApplication){
  const options = new DocumentBuilder()
    .addServer('https://k6hts7or0e.execute-api.us-east-1.amazonaws.com/prod/')
    .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('docs',app,document);

}
const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.use(awsServerlessExpressMiddleware.eventContext())
  app.enableCors();
  setupSwagger(app);
  await app.init();
  return awsServerlessExpress.createServer(expressApp);
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (event.path === '/docs') {
    // eslint-disable-next-line no-param-reassign
    event.path = '/docs/';
  }
  // eslint-disable-next-line no-param-reassign
  event.path = event.path.includes('swagger-ui') ? `/docs${event.path}` : event.path;

  if (!cachedServer) {
    cachedServer = await bootstrapServer()
  }

  return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
    .promise;
};
