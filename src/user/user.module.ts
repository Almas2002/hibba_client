import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './user.service';
import { FileModule } from '../file/file.module';
require('dotenv').config()
@Module({
  controllers:[UserController],
  imports:[ClientsModule.register([
    {
      name: 'USER_SERVICE',
      transport: Transport.REDIS,
      options: {
        url: process.env.USER_SERVICE,
      }
    },
  ]),AuthModule,FileModule],
  providers:[UserService],
  exports:[UserService]
})
export class UserModule {}