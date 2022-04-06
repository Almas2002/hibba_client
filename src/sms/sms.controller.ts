import { Body, Controller, Post } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateSmsDto } from './dto/create-sms.dto';

@ApiTags('SMS')
@Controller('sms')
export class SmsController {
  constructor(private smsService: SmsService) {}

  @Post('check')
  check(@Body()dto: CreateSmsDto) {
    return this.smsService.checkSms(dto);
  }

  @Post('send-code')
  sendCode(@Body()dto: CreateSmsDto) {
    return this.smsService.createSms(dto.phone);
  }
}