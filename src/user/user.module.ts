import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './user.service';
import { FileModule } from '../file/file.module';
import { RoleModule } from '../role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

require('dotenv').config()
@Module({
  controllers:[UserController],
  imports:[forwardRef(()=>AuthModule),FileModule,TypeOrmModule.forFeature([User]),RoleModule],
  providers:[UserService],
  exports:[UserService]
})
export class UserModule {}