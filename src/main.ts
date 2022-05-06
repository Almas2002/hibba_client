import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as requestIp from 'request-ip';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MyValidationPipe } from './pipes/MyValidatorPipe';
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:{origin:["*"],credentials:true}});
  app.use(requestIp.mw());
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Hibba')
    .setDescription('Documentation for REST API')
    .setVersion('1.0.0')
    .addTag('Hibba')
    .build();
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  const documentation = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, documentation);

  await app.listen(3000);
}
bootstrap();
