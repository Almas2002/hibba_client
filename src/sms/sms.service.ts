import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CheckSmsDto } from './dto/check-sms.dto';
import { CreateSmsDto } from './dto/create-sms.dto';

@Injectable()
export class SmsService {
  constructor(@Inject('SMS_SERVICE') private smsService: ClientProxy) {
  }

  async createSms(phone: string) {
    const cmd = { cmd: 'send-code-to-phone' };
    return this.smsService.send(cmd, phone).toPromise();
  }

  async checkSms(dto: CreateSmsDto) {
    const cmd = { cmd: 'check-code' };
    return this.smsService.send(cmd, dto).toPromise();
  }
}