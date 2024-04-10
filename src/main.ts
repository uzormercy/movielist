import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import instance from './shared/utils/logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const stage = process.env.NODE_ENV || 'development';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });
  app.setGlobalPrefix('api/v1');

  const allowedOrigins = ['*'];
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  if (['development', 'staging'].includes(stage)) {
    const config = new DocumentBuilder()
      .setTitle('Vendease Movie API service')
      .setDescription('The backend service call for Vendease movie  backend')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, document);
  }
  await app.listen(process.env.PORT || 3100);
}
bootstrap();
