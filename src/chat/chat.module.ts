import { Module } from '@nestjs/common';
import { JoinedRoomService } from './service/joined-room.service';
import { MessageService } from './service/message.service';
import { RoomService } from './service/room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinedRoom } from './model/joined-room.entity';
import { Message } from './model/message.entity';
import { Room } from './model/room.entity';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([JoinedRoom, Message, Room]),ProfileModule],
  providers: [JoinedRoomService, MessageService, RoomService],
  exports:[JoinedRoomService,MessageService,RoomService]
})
export class ChatModule {}