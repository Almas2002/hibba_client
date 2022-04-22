import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegionService } from './region.service';

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

}