import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import {ApiOperation} from "@nestjs/swagger";
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
  @Post('statistic')
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
