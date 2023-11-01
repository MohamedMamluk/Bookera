import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger/swagger.utils';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('got request');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(3001);
}
bootstrap();
