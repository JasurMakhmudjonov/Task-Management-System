import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = app.get<ConfigService>(ConfigService);

  app.use(
    '/api/docs',
    basicAuth({
      challenge: true,
      users: {
        [config.get('BASIC_AUTH_USERNAME')]: config.get('BASIC_AUTH_PASSWORD'),
      },
    }),
  );
  app.enableVersioning();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Exapmple API Documentation')
    .setDescription('Starter')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(config.get('PORT'), () => {
    console.log(`Server: http://localhost:${config.get('PORT')}`);
    console.log(`Docs: http://localhost:${config.get('PORT')}/api/docs`);
  });
}
bootstrap();
