import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(@InjectRepository(Notification) private notificationRepository: Repository<Notification>) {
  }

  async createNotificationForEverybody(text: string) {
    return await this.notificationRepository.save({ text });
  }

  async createNotificationForOneUser(text: string, id: number) {
    return await this.notificationRepository.save({ text, user: { id } });

  }
}