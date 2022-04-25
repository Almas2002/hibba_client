import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { CreateMessageDto } from '../dto/create-message.dto';
import { GetMessageQuery, GetMessagesDto } from '../dto/get-messages.dto';
import { RoomService } from '../service/room.service';

@Controller('chat')
export class ChatController {
  constructor(private messageService:MessageService,private roomService:RoomService) {}

  @UseGuards(AuthGuard)
  @Post('message')
  createMessage(@Body()dto:CreateMessageDto){
     return this.messageService.createMessage(dto)
  }

  @Get('message')
  getMessages(@Body()data:GetMessagesDto,@Query()query:GetMessageQuery){
       return this.messageService.getAllMessage(data.roomId,{...query},query.new)
  }
}