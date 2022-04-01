import { Body, Controller, Post } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private smsService: SmsService) {
  }

  @Post('check')
  check() {

  }

  @Post('send-code')
  sendCode(@Body('phone')phone: string) {
    return this.smsService.createSms(phone);
  }
}