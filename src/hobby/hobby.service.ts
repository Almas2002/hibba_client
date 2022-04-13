import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hobby } from './hobby.entity';
import { Repository } from 'typeorm';
import { CreateHobbyDto, updateHobby } from './dto/create-hobby.dto';

@Injectable()
export class HobbyService {
  constructor(@InjectRepository(Hobby) private hobbyRepository: Repository<Hobby>) {}

  async createHobby(data: CreateHobbyDto) {
    return await this.hobbyRepository.save({ ...data, gender: { id: data.genderId } });
  }

  async updateHobby(data: updateHobby) {
    const hobby = await this.hobbyRepository.findOne({ where: { id: data.id } });
    hobby.value = data.value;
    return await this.hobbyRepository.save(data);
  }

  async getHobbies(genderId: number) {
    if (genderId !== 0) {
      return await this.hobbyRepository.find({ where: { genderId } });
    }
    return await this.hobbyRepository.find();
  }
  async removeHobby(id:number){
    await this.hobbyRepository.delete({id})
  }
  async getOneHobby(id:number){
    return await this.hobbyRepository.findOne({id})
  }
}
