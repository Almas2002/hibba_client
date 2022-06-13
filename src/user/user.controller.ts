import {Body, Controller, Get, Param, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import {ApiOperation} from "@nestjs/swagger";
import {UpdateWorkerDto} from "../profile/dto/update-worker.dto";
import {UserStatisticDto} from "./dto/user-statistic.dto";
import {AuthGuard} from "../auth/guard/auth.guard";
import {UserDecorator} from "./decorators/user.decorator";

@Controller('user')
export class UserController {
  constructor(private userService:UserService) {}

  @Get('check')
  @UseGuards(AuthGuard)
  check(@UserDecorator('id')id:number){
    return this.userService.getRoles(id)
  }

  @ApiOperation({summary:"статистика"})
  @Get('statistic')
  statistic(@Body()dto:UserStatisticDto){
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
