import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './region.entity';
import { ReligionController } from '../religion/religion.controller';
import { ReligionService } from '../religion/religion.service';

@Module({
  imports:[TypeOrmModule.forFeature([Region])],
  controllers:[ReligionController],
  providers:[ReligionService]
})
export class RegionModule {
}