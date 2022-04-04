import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as requestIp from 'request-ip';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MyValidationPipe } from './pipes/MyValidatorPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(requestIp.mw());
  app.use(cookieParser());
  app.useGlobalPipes(new MyValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Hibba')
    .setDescription('Documentation for REST API')
    .setVersion('1.0.0')
    .addTag('Hibba')
    .build();
  const documentation = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documentation);
  await app.listen(3000);
}
bootstrap();
