import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { SmsModule } from '../sms/sms.module';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { UserModule } from '../user/user.module';
require('dotenv').config()
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'hello world',
      signOptions: { expiresIn: '180m' },
    }),
    TypeOrmModule.forFeature([Auth])
  ],
  providers:[AuthService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {
}
