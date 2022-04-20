import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

import { ConnectedUserService } from '../socket/socket.service';
import { Notification } from './notification.entity';
import { IMessage } from './interface/interface';
import { MessageService } from '../chat/service/message.service';
import { RoomService } from '../chat/service/room.service';
import { JoinedRoomService } from '../chat/service/joined-room.service';

@WebSocketGateway({ namespace: '/', cors: true, })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  constructor(private connectedUserService: ConnectedUserService,
              private messageService:MessageService,private roomService:RoomService,private joinedRoomService:JoinedRoomService) {
  }

  @WebSocketServer() wss: Server;

  sendToUser(userId: string, data: Notification) {
    this.wss.to(userId).emit('notification', data);
  }
  async handleConnection(socket: Socket, data: any) {
    let token;
    if (!socket.handshake.query.token) {
      return null;
    }
    try {
      token = verify(`${socket.handshake.query.token}`, 'hello world');
      socket.data.user = token;
      await this.connectedUserService.createConnectedUser({ socketId: socket.id, userId: token.id });
    } catch (e) {
      return ChatGateway.disconnect(socket);
    }
  }
  @SubscribeMessage('add-message')
  async createMessage(socket:Socket,data:IMessage){
    const room = await this.roomService.getRoom(data.roomId)
    if (!room){
      await this.wss.emit('Error','такого канала нету')
    }
    const createMessage = await this.messageService.createMessage({...data,userId:socket.data.user.id})
    const joinedUsers  = await this.joinedRoomService.findByRoomId(room.id)
    for (const user of joinedUsers){
           await this.wss.to(user.socketId).emit('messageAdded',createMessage)
    }
  }

  async createRoom(){

  }

  private static disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException('вы не зарегестрированы'));
    socket.disconnect();
  }

  async handleDisconnect(client: Socket): Promise<void> {
    await this.connectedUserService.deleteBySocketId(client.id);

  }

  async onModuleInit(): Promise<void> {
    await this.connectedUserService.deleteAll();
  }
}