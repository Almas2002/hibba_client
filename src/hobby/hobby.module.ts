import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hobby } from './hobby.entity';
import { HobbyService } from './hobby.service';
import { HobbyController } from './hobby.controller';

@Module({
  providers:[HobbyService],
  controllers:[HobbyController],
  exports:[HobbyService],
  imports:[TypeOrmModule.forFeature([Hobby])]
})
export class HobbyModule {}