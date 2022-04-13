import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private userService:UserService) {}

  @MessagePattern({cmd:"get-one-user"})
  getOne(id:number){
    return this.userService.findUserById(id)
  }

}
