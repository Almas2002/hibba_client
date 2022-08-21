import {Injectable} from '@nestjs/common';
import {NotificationService} from './notification.service';
import {ChatGateway} from '../chat.gateway';
import {ConnectedUserService} from '../../socket/socket.service';
import {Like} from "../../profile/models/like.entity";
import {Notification, NotificationType} from "../notification.entity";
import {Message} from "../../chat/model/message.entity";
import {Room} from "../../chat/model/room.entity";
import {PushNotificationService} from "../../pushNotification/pushNotification.service";
import {User} from "../../user/user.entity";

@Injectable()
export class NotificationGatewayService {
  constructor(private notificationService: NotificationService, private notificationGateway: ChatGateway,
              private connectedUserService: ConnectedUserService,private push:PushNotificationService) {

  }

  async congratulationNotification(message: string) {
    const notification = await this.notificationService.createNotificationForEverybody(message);
    const users = await this.connectedUserService.findAllUser();
    for (const user of users) {
      this.notificationGateway.sendToUser(user.socketId, notification)
    }
  }

  async congratulationNotificationForOneUser(message: string, userTo: User,type:NotificationType = NotificationType.NOTIFICATION) {
    const notification = await this.notificationService.createNotificationForOneUser(message, userTo.id,type);
    await this.defaultNotificationOne(notification,userTo)
  }
  async likeNotification(message:string,like:Like,userTo:User){
    const notification = await this.notificationService.createLikeNotification(message,userTo.id,like)
    await this.defaultNotificationOne(notification,userTo)
  }

  async messageNotification(message:string,message1:Message,userTo:User){
    const notification = await this.notificationService.createMessageNotification(message,message1,userTo.id)
    await this.defaultNotificationOne(notification,userTo)
  }
  async roomNotification(message:string,room:Room,userTo:User){
    const notification = await this.notificationService.createRoomNotification(message,room,userTo.id)
    await this.defaultNotificationOne(notification,userTo)
  }
  async callNotification(message:string,userId:number,room:Room,type:NotificationType = NotificationType.CALL){
    const users = await this.connectedUserService.findAllUser();
    const candidate = users.filter(u=>u.user.id === userId)
    const notification = await this.notificationService.createNotificationForOneUserCall(message, userId,type,room);
    notification.room = room
    if (candidate){
      this.notificationGateway.sendToUser(users[0].socketId, notification);
    }
  }
  private async defaultNotificationOne(notification:Notification,userTo:User){
    const users = await this.connectedUserService.findAllUser();
    const candidate = users.filter(u=>u.user.id === userTo.id)
    if(!candidate.length){
      if(userTo.pushToken){
        await this.push.sendNotification(userTo.pushToken,notification)
      }
    }else {
      for (const user of users) {
        if (user.user.id == userTo.id) {
          this.notificationGateway.sendToUser(user.socketId, notification);
        }
      }
    }

  }

}