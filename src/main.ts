import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as requestIp from 'request-ip'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(requestIp.mw());
  app.use(cookieParser())
  await app.listen(3000);
}
bootstrap();
