import { Injectable } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ChatGateway } from '../chat.gateway';
import { ConnectedUserService } from '../../socket/socket.service';

@Injectable()
export class NotificationGatewayService {
  constructor(private notificationService: NotificationService, private notificationGateway: ChatGateway,
              private connectedUserService: ConnectedUserService) {

  }

  async congratulationNotification(message: string) {
    const notification = await this.notificationService.createNotificationForEverybody(message);
    const users = await this.connectedUserService.findAllUser();
    for (const user of users) {
      this.notificationGateway.sendToUser(user.socketId, notification);
    }
  }

  async congratulationNotificationForOneUser(message: string, userId: number) {
    const notification = await this.notificationService.createNotificationForOneUser(message, userId);
    const users = await this.connectedUserService.findAllUser();
    for (const user of users) {
      if (user.id == userId) {
        this.notificationGateway.sendToUser(user.socketId, notification);
      }
    }
  }
}