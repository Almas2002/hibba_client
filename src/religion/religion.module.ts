import { Module } from '@nestjs/common';
import { ReligionController } from './religion.controller';
import { ReligionService } from './religion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Religion } from './religion.entity';

@Module({
  controllers:[ReligionController],
  providers:[ReligionService],
  imports:[TypeOrmModule.forFeature([Religion])]
})
export class ReligionModule {}