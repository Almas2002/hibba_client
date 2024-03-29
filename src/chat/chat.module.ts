import {forwardRef, Module} from '@nestjs/common';
import {JoinedRoomService} from './service/joined-room.service';
import {MessageService} from './service/message.service';
import {RoomService} from './service/room.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JoinedRoom} from './model/joined-room.entity';
import {Message} from './model/message.entity';
import {Room} from './model/room.entity';
import {ChatController} from "./controller/chat.controller";
import {Profile} from "../profile/models/profile.entity";
import {SemiProfileService} from "./service/semi-profile.service";
import {NotificationModule} from "../notification/notification.module";
import {AgoraChannel} from "./model/agora-channel.entity";

@Module({
    imports: [TypeOrmModule.forFeature([JoinedRoom, Message, Room, Profile, AgoraChannel]), forwardRef(() => NotificationModule)],
    providers: [JoinedRoomService, MessageService, RoomService, SemiProfileService],
    exports: [JoinedRoomService, MessageService, RoomService],
    controllers: [ChatController],
})
export class ChatModule {
}