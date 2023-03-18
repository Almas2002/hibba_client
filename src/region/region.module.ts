import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './region.entity';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import {Area} from "./area.entity";

@Module({
  controllers: [RegionController],
  providers: [RegionService],
  imports: [TypeOrmModule.forFeature([Region,Area])],
  exports:[RegionService]
})
export class RegionModule {
}