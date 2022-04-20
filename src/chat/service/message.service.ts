import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../model/message.entity';
import { IPagination } from '../../profile/interfaces/get-profile-query.interface';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(@InjectRepository(Message) private messageRepository: Repository<Message>) {
  }

  async createMessage(message: CreateMessageDto):Promise<Message> {
    return await this.messageRepository.save({...message,user:{id:message.userId},room:{id:message.roomId}})
  }

  async getAllMessage(id: number, pagination: IPagination) {
    const limit = pagination?.limit || 10;
    const page = pagination?.page || 1;
    const offset = page * limit - limit;
    const query = this.messageRepository
      .createQueryBuilder("message")
      .leftJoin("message.room", "room")
      .where("room.id = :roomId", {roomId: id})
      .leftJoinAndSelect("message.user", "user")
      .orderBy("room.updatedAt", "DESC");
    query.limit(limit)
    query.offset(offset)

    return query.getMany()
  }
}