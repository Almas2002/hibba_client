import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { CreateHobbyDto, updateHobby } from './dto/create-hobby.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller()
export class HobbyController {
  constructor(private hobbyService: HobbyService) {
  }
  @ApiOperation({summary:"создать хобби"})
  @ApiResponse({status:201})
  @Post('create-hobby')
  createHobby(@Body()data: CreateHobbyDto) {
    return this.hobbyService.createHobby(data);
  }
  @ApiOperation({summary:"получить хобби"})
  @ApiResponse({status:200})
  @ApiQuery({name:"id",example:"1",description:"айди гендера",required:false})
  @Get('get-hobbies')
  getHobbies(@Query('id')id: number) {
    return this.hobbyService.getHobbies(id);
  }
  @ApiOperation({summary:"изменить хобби"})
  @ApiResponse({status:200})
  @Put('update-hobby/:id')
  updateHobbies(@Body()data: updateHobby,@Param('id')id:number) {
    data = {...data,id}
    return this.hobbyService.updateHobby(data);
  }
  @ApiOperation({summary:"удалить хобби"})
  @ApiResponse({status:200})
  @Delete(`remove-hobby/:id`)
  removeHobby(@Param('id')id: number) {
    return this.hobbyService.removeHobby(id);
  }
}