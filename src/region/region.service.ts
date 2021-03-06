import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './region.entity';
import { Repository } from 'typeorm';
import { CreateRegionDto } from './dto/create-region.dto';

@Injectable()
export class RegionService {
  constructor(@InjectRepository(Region) private regionRepository: Repository<Region>) {}

  async createRegion(dto: CreateRegionDto) {
    return await this.regionRepository.save({ value: dto.value });
  }

  async getRegions(){
    return await this.regionRepository.find()
  }
  async findOne(id:number){
    return await this.regionRepository.findOne(id)
  }
  async delete(id:number){
    return await this.regionRepository.delete({id})
  }

}