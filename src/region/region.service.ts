import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Region} from './region.entity';
import {Repository} from 'typeorm';
import {CreateRegionDto} from './dto/create-region.dto';
import {Area} from "./area.entity";
import {CreateAreaDto} from "./dto/create-area.dto";

@Injectable()
export class RegionService {
  constructor(@InjectRepository(Region) private regionRepository: Repository<Region>,@InjectRepository(Area) private areaRepository: Repository<Area>) {}

  async createRegion(dto: CreateRegionDto) {
    const area = await this.getOneArea(dto.areaId)
    if (!area){
      throw new HttpException("область не найдена",404)
    }
    return await this.regionRepository.save({ value: dto.value ,area});
  }

  async createArea(dto:CreateAreaDto){
    let candidate =  await this.areaRepository.findOne({where:{value:dto.value}})
    if (candidate){
      throw new HttpException("такая область уже есть",HttpStatus.CONFLICT)
    }
    return await this.areaRepository.save({value:dto.value})

  }
  async getRegions(areaId:number){
    return await this.regionRepository.find({where:{area:{id:areaId}}})
  }
  async findOne(id:number){
    return await this.regionRepository.findOne(id)
  }
  async delete(id:number){
    return await this.regionRepository.delete({id})
  }

  async getOneArea(id:number):Promise<Area>{
    return this.areaRepository.findOne({where: {id}})
  }
  async getArias():Promise<Area[]>{
    return await this.areaRepository.find()
  }
  async deleteArea(id:number){
    return await this.areaRepository.delete({id})
  }


}