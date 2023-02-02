import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);

  const port = configService.get('API_PORT');

  Logger.log(
    `API:${configService.get('NODE_ENV')} started at port: ${port}`,
    `main.ts`,
  );

  await app.listen(port);
}
// Задержка для того, чтобы успел подцепиться дебаггер при аттаче. Иначе продебажить bootstrap не выходит
setTimeout(() => bootstrap(), 1500);
