import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { SmsModule } from '../sms/sms.module';
require('dotenv').config()
@Module({
  imports: [
    JwtModule.register({
      secret: 'hello world',
      signOptions: { expiresIn: '180m' },
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: process.env.AUTH_SERVICE,
        },
      },
    ]),
    SmsModule
  ],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {
}
