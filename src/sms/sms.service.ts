import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SmsService {
  constructor(@Inject('SMS_SERVICE') private smsService: ClientProxy) {
  }

  async createSms(phone: string) {
    const cmd = { cmd: 'send-code-to-phone' };
    return this.smsService.send(cmd, phone).toPromise();
  }
}