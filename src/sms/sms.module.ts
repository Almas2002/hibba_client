import { Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SmsService } from './sms.service';
require('dotenv').config()
@Module({
  controllers:[SmsController],
  imports:[
    ClientsModule.register([
      {
        name:'SMS_SERVICE',
        transport:Transport.REDIS,
        options:{
          url: process.env.SMS_SERVICE
        },
      }
    ]),
    ],
  exports:[SmsService],
  providers:[SmsService]
})
export class SmsModule {}