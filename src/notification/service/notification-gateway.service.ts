import {Injectable} from '@nestjs/common';
import {NotificationService} from './notification.service';
import {ChatGateway} from '../chat.gateway';
import {ConnectedUserService} from '../../socket/socket.service';
import {Like} from "../../profile/models/like.entity";
import {NotificationType} from "../notification.entity";
import {Message} from "../../chat/model/message.entity";

@Injectable()
export class NotificationGatewayService {
  constructor(private notificationService: NotificationService, private notificationGateway: ChatGateway,
              private connectedUserService: ConnectedUserService) {

  }

  async congratulationNotification(message: string) {
    const notification = await this.notificationService.createNotificationForEverybody(message);
    const users = await this.connectedUserService.findAllUser();
    for (const user of users) {
      this.notificationGateway.sendToUser(user.socketId, notification)
    }
  }

  async congratulationNotificationForOneUser(message: string, userId: number,type:NotificationType = NotificationType.NOTIFICATION) {
    const notification = await this.notificationService.createNotificationForOneUser(message, userId,type);
    const users = await this.connectedUserService.findAllUser();
    for (const user of users) {
      if (user.user.id == userId) {
        this.notificationGateway.sendToUser(user.socketId, notification);
      }
    }
  }
  async likeNotification(message:string,like:Like,userId:number){
    const notification = await this.notificationService.createLikeNotification(message,userId,like)
    const users = await this.connectedUserService.findAllUser();
    for (const user of users) {
      if (user.user.id == userId) {
        this.notificationGateway.sendToUser(user.socketId, notification);
      }
    }
  }

  async messageNotification(message:string,message1:Message,userId:number){
    const notification = await this.notificationService.createMessageNotification(message,message1,userId)
    const users = await this.connectedUserService.findAllUser();
    for (const user of users) {
      if (user.user.id == userId) {
        this.notificationGateway.sendToUser(user.socketId, notification);
      }
    }
  }

}