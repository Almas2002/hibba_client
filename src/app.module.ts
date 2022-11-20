import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './middleware/auth.milddleaware';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HobbyModule } from './hobby/hobby.module';
import { CategoryModule } from './category/category.module';
import { ProfileModule } from './profile/profile.module';
import { RoleModule } from './role/role.module';
import { ReligionModule } from './religion/religion.module';
import { GenderModule } from './gender/gender.module';
import { ComplaintModule } from './complaint/complaint.module';
import { RegionModule } from './region/region.module';
import {NotificationModule} from "./notification/notification.module";
import {ChatModule} from "./chat/chat.module";
import {PushNotificationModule} from "./pushNotification/pushNotification.module";
import {HadisModule} from "./hadis/hadis.module";
import {PostsModule} from "./posts/posts.module";

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      ssl: false,
      // url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
    ,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname,'static'),
    }), AuthModule, UserModule, FileModule, HobbyModule, CategoryModule,
    ProfileModule, RoleModule, ReligionModule, GenderModule, ComplaintModule, RegionModule,NotificationModule,ChatModule,PushNotificationModule,HadisModule,PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
