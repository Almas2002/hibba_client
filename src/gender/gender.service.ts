import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from './gender.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenderService {
  constructor(@InjectRepository(Gender)private genderRepository:Repository<Gender>) {}
  async createGender(data:CreateGenderDto){
    return await this.genderRepository.save(data)
  }

  async getGenders(){
    return await this.genderRepository.find()
  }

  async updateGender(id:number,newValue:string){
    const gender = await this.genderRepository.findOne({where:{id}})
    gender.value = newValue
    return await this.genderRepository.save(gender)
  }

}