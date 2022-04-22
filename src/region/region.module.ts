import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './region.entity';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';

@Module({
  controllers: [RegionController],
  providers: [RegionService],
  imports: [TypeOrmModule.forFeature([Region])],
  exports:[RegionService]
})
export class RegionModule {
}