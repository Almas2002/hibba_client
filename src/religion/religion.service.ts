import { Entity, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Religion } from './religion.entity';

@Entity()
export class ReligionService {
  constructor(@InjectRepository(Religion)private religionRepository:Repository<Religion>) {}

  async createReligion(value:string){
    return await this.religionRepository.save({value})
  }

  async getReligions(){
    return await this.religionRepository.find()
  }
}