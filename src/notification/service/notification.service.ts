import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Notification, NotificationType} from '../notification.entity';
import { Repository } from 'typeorm';
import {Like} from "../../profile/models/like.entity";
import {Message} from "../../chat/model/message.entity";

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

  async createLikeNotification(text:string,id:number,like:Like){
    return await this.notificationRepository.save({text,user:{id},like,type:NotificationType.LIKE})
  }
  async createMessageNotification(text:string,message:Message,id:number){
   return await this.notificationRepository.save({text,user:{id},message,type:NotificationType.MESSAGE})
  }
}