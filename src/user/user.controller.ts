import {Body, Controller, Get, Param} from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import {ApiOperation} from "@nestjs/swagger";
import {UpdateWorkerDto} from "../profile/dto/update-worker.dto";
import {UserStatisticDto} from "./dto/user-statistic.dto";

@Controller('user')
export class UserController {
  constructor(private userService:UserService) {}

  @MessagePattern({cmd:"get-one-user"})
  getOne(id:number){
    return this.userService.findUserById(id)
  }
  @ApiOperation({summary:"статистика"})
  @Get('statistic')
  statistic(@Body()dto:UserStatisticDto){
    console.log(dto)
    return this.userService.getStatistic(dto)
  }

  @ApiOperation({ description: 'получить админов(админ)'})
  @Get('get-admins')
  getAdmins(){
    return this.userService.getAllAdmins()
  }
  @ApiOperation({ description: 'получить одного пользователя'})
  @Get("/:id")
  getUserById(@Param("id")id:number){
     return this.userService.findUserById(id)
  }




}
