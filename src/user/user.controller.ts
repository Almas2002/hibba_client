import {Controller, Get, Param} from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import {ApiOperation} from "@nestjs/swagger";

@Controller('user')
export class UserController {
  constructor(private userService:UserService) {}

  @MessagePattern({cmd:"get-one-user"})
  getOne(id:number){
    return this.userService.findUserById(id)
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
