import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from './complaint.entity';
import { ComplaintService } from './complaint.service';
import { ComplaintController } from './complaint.controller';
import { ProfileModule } from '../profile/profile.module';

@Module({
  controllers:[ComplaintController],
  providers:[ComplaintService],
  imports:[TypeOrmModule.forFeature([Complaint]),ProfileModule]
})
export class ComplaintModule {}