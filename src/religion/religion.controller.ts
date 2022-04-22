import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReligionService } from './religion.service';

@Controller('religion')
export class ReligionController {
  constructor(private religionService: ReligionService) {
  }
  @Post('create-religion')
  createReligion(@Body('value')value: string) {
    return this.religionService.createReligion(value);
  }

  @Get('get-religions')
  getReligions() {
    return this.religionService.getReligions();
  }
}