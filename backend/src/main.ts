import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger.service';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new LoggerService();
  const app = await NestFactory.create(AppModule, { logger });

  // Security headers (XSS, clickjacking, etc.)
  app.use(helmet());

  app.setGlobalPrefix('api');
  app.enableCors({ origin: 'http://localhost:5173', credentials: true });
  await app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3005;
  await app.listen(port);
  logger.log(`Application running on port ${port}`, 'Bootstrap');
}
bootstrap();
