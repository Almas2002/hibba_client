import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { CreateMessageDto } from '../dto/create-message.dto';
import { GetMessageQuery, GetMessagesDto } from '../dto/get-messages.dto';
import { RoomService } from '../service/room.service';
import { UserDecorator } from '../../user/decorators/user.decorator';
import { IPagination } from '../../profile/interfaces/get-profile-query.interface';
import { User } from '../../user/user.entity';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LeaveRoomDto } from '../dto/leave-room.dto';
import { JoinedRoomService } from '../service/joined-room.service';

@Controller('chat')
export class ChatController {
  constructor(private messageService: MessageService, private roomService: RoomService,private joinedRoomService:JoinedRoomService) {}

  @ApiOperation({ summary: 'создать сообщение' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('message')
  createMessage(@Body()dto: CreateMessageDto, @UserDecorator('id')id: number) {
    dto = { ...dto, userId: id };
    return this.messageService.createMessage(dto);
  }

  @ApiOperation({ summary: 'взять сообщение одной комнаты' })
  @Get('message')
  getMessages(@Body()data: GetMessagesDto, @Query()query: GetMessageQuery) {
    return this.messageService.getAllMessage(data.roomId, { ...query }, query.new);
  }

  @ApiOperation({ summary: 'получить чаты' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('room')
  getRooms(@UserDecorator('id')id: number, @Query()pagination: IPagination) {
    return this.roomService.getRoomsForUser(id, pagination);
  }

  @ApiOperation({ summary: 'создать чат' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('room')
  createRoom(@UserDecorator()creator: User, @Body()user: User) {
    return this.roomService.createRoom(creator, user);
  }

  @Put('leave-room')
  leaveRoom(@Body()dto:LeaveRoomDto){
    return this.joinedRoomService.deleteBySocketId(dto.socketId)
  }
}