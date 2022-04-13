import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from '../auth/dto/user-login.dto';
import { RoleService } from '../role/role.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private roleService: RoleService) {
  }


  async createUser(dto: UserLoginDto,rol:string = "USER"): Promise<User> {
    let role = await this.roleService.getRoleByValue(rol);
    if (!role) {
      role = await this.roleService.create({ description: `${rol} сайта`, value: rol });
    }
    const user = await this.userRepository.save(dto);
    user.roles = [role];
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async getUserByPhoneNumber(phone: string) {
    return this.userRepository.findOne({ phone },{select:['password','id','phone']});
  }

  async addRoleForUser(dto: AddRoleDto): Promise<User> {
    const { role, user } = await this.workWithRole(dto);
    user.roles = [...user.roles, role];
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async deleteRoleFromUser(dto: AddRoleDto) {
    const { role, user } = await this.workWithRole(dto);
    const roles = user.roles.filter(e => e.value !== role.value);
    user.roles = [...roles];
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async workWithRole(dto: AddRoleDto) {
    const user = await this.getUserByPhoneNumber(dto.phone);
    const role = await this.roleService.getRoleByValue(dto.role);
    if (!user || !role) {
      throw new HttpException('не найден пользователь или роль', HttpStatus.BAD_REQUEST);
    }

    if (user.roles.some(userRole => userRole.value == role.value)) {
      return;
    }
    return { user, role };
  }
  async findUserById(id:number){
    return await this.userRepository.findOne({id},{relations:["roles"]})
  }


}