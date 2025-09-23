import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:3000' });
  const cfg = app.get(ConfigService);
  const port = parseInt(cfg.get<string>('PORT') || '4000', 10);
  await app.listen(port);
  console.log(`API listening on http://localhost:${port}`);
}
bootstrap();
