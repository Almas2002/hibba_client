import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { RegionService } from './region.service';
import {ApiOperation, ApiProperty, ApiTags} from "@nestjs/swagger";
@ApiTags('region')
@Controller('region')
export class RegionController {
  constructor(private regionService: RegionService) {}

  @Post()
  create(@Body('value')value: string) {
    return this.regionService.createRegion({ value });
  }

  @Get()
  getAll() {
    return this.regionService.getRegions();
  }
  @ApiOperation({summary:"удаление региона"})
  @Delete(":id")
  delete(@Param('id')id:number){
    return this.regionService.delete(id)
  }

}