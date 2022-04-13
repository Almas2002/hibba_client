import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { GenderService } from './gender.service';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags("гендер")
@Controller('gender')
export class GenderController {
  constructor(private genderService:GenderService) {}

  @ApiOperation({summary:"создать гендр"})
  @ApiResponse({status:201})
  @Post('create-gender')
  createGender(@Body()data:CreateGenderDto){
    return this.genderService.createGender(data)
  }
  @ApiOperation({summary:"получить гендр"})
  @ApiResponse({status:200})
  @Get('get-genders')
  getGenders(){
    return this.genderService.getGenders()
  }

}