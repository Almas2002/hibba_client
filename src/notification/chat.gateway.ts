import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {OnModuleInit, UnauthorizedException} from '@nestjs/common';
import {verify} from 'jsonwebtoken';

import {ConnectedUserService} from '../socket/socket.service';
import {Notification} from './notification.entity';
import {IMessage} from './interface/interface';
import {MessageService} from '../chat/service/message.service';
import {RoomService} from '../chat/service/room.service';
import {JoinedRoomService} from '../chat/service/joined-room.service';
import {TypingDto} from "./dto/typing.dto";
import {NotificationService} from "./service/notification.service";

@WebSocketGateway({namespace: '/', cors: {origin: "*", credentials: true, methods: ["GET", "POST"],}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
    constructor(private connectedUserService: ConnectedUserService,
                private messageService: MessageService, private roomService: RoomService, private joinedRoomService: JoinedRoomService, private notificationService: NotificationService) {
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
            await this.connectedUserService.createConnectedUser({socketId: socket.id, userId: token.id});
        } catch (e) {
            return ChatGateway.disconnect(socket);
        }
    }

    @SubscribeMessage('add-message')
    async createMessage(socket: Socket, data: IMessage) {
        const room = await this.roomService.getRoom(data.roomId);
        if (!room) {
            await this.wss.emit('Error', 'такого канала нету');
        }

        const createMessage = await this.messageService.createMessage({...data, userId: socket.data.user.id});
        const u = room.joinedUsers.filter(u => u.user.id != socket.data.user)[0]
        const joinedUsers = await this.joinedRoomService.findByRoomId(room.id);
        let connectedUsers = null
        let notification = null
        for (const user of joinedUsers) {
            if (user.user.id != u.user.id) {
                connectedUsers = await this.connectedUserService.findByUserId(u.user.id)
                notification = await this.notificationService.createMessageNotification(`у вас новое сообщение от :${user.user.profile.firstName}`, createMessage, u.user.id)
                if (connectedUsers) {
                    await this.sendToUser(u.socketId,notification)
                }
            } else {
                await this.wss.to(user.socketId).emit('messageAdded', createMessage);
            }
        }
    }

    @SubscribeMessage('join-room')
    async comeInChat(socket: Socket, data: number) {
        console.log(data)
        const messages = await this.messageService.getAllMessage(data, {limit: 10, page: 1});
        await this.joinedRoomService.create(socket.id, socket.data.user.id, data);
        await this.wss.to(socket.id).emit('messages', messages);
    }

    @SubscribeMessage('leave-room')
    async leaveRoom(socket: Socket) {
        await this.joinedRoomService.deleteBySocketId(socket.id)
    }

    @SubscribeMessage('typing')
    async typing(socket: Socket, data: TypingDto) {
        const room = await this.roomService.getRoom(data.chatId);
        if (!room) {
            await this.wss.emit('Error', 'такого канала нету');
        }
        const joinedUsers = await this.joinedRoomService.findByRoomId(room.id);

        for (const user of joinedUsers) {
            if (user.id != socket.data.user) {
                await this.wss.to(user.socketId).emit('typing', data);
            }
        }

    }

    private static disconnect(socket: Socket) {
        socket.emit('Error', new UnauthorizedException('вы не зарегестрированы'));
        socket.disconnect();
    }

    async handleDisconnect(client: Socket): Promise<void> {
        await this.joinedRoomService.deleteBySocketId(client.id)
        await this.connectedUserService.deleteBySocketId(client.id);

    }

    async onModuleInit(): Promise<void> {
        await this.connectedUserService.deleteAll();
        await this.joinedRoomService.deleteAll();
    }
}