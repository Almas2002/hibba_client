import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Complaint } from './complaint.entity';
import { Repository } from 'typeorm';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class ComplaintService {
  constructor(@InjectRepository(Complaint) private complaintRepository: Repository<Complaint>, private profileService: ProfileService) {
  }


  async createComplaint(dto: CreateComplaintDto) {
    const profile = await this.profileService.getUserProfile(dto.userId);
    const complaints = await this.complaintRepository.find({ where: { reporter: profile, createdAt: new Date() } });
    if (complaints.length >= 5) {
      return { message: 'вы не можете написать жалобу больше 5ти раз за день', status: 400 };
    }
    await this.complaintRepository.save({ culprit: { id: dto.profileId }, text: dto.text, reporter: profile });
  }

  async getComplaint(profileId: number) {
    return await this.complaintRepository.find({ where: { culprit: { id: profileId } }, relations: ['reporter'] });
  }
}