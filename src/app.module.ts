import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';


import { AuthMiddleware } from './middleware/auth.milddleaware';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [AuthModule,UserModule,FileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:".env"
    }),
  ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }
}
