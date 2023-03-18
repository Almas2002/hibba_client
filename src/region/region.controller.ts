import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { RegionService } from './region.service';
import {ApiOperation, ApiProperty, ApiTags} from "@nestjs/swagger";
import {CreateRegionDto} from "./dto/create-region.dto";
import {CreateAreaDto} from "./dto/create-area.dto";
@ApiTags('region')
@Controller('region')
export class RegionController {
  constructor(private regionService: RegionService) {}

  @Post()
  create(@Body()dto: CreateRegionDto) {
    return this.regionService.createRegion(dto);
  }
  @Post('/area')
  createArea(@Body()dto: CreateAreaDto) {
    return this.regionService.createArea(dto);
  }

  @Get("/city/:id")
  getAll(@Param('id') id:number) {
    return this.regionService.getRegions(id);
  }
  @ApiOperation({summary:"удаление города"})
  @Delete("/city/:id")
  delete(@Param('id')id:number){
    return this.regionService.delete(id)
  }
  @ApiOperation({summary:"удаление региона"})
  @Delete("/area/:id")
  deleteArea(@Param('id')id:number){
    return this.regionService.deleteArea(id)
  }

  @ApiOperation({summary:"получить регионы"})
  @Get("/area")
  getAllAreas(){
    return this.regionService.getArias()
  }


}