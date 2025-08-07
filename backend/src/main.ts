import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks/tasks.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule);
  app.useGlobalPipes(
  new ValidationPipe({
    transform: true, 
  }),
);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
