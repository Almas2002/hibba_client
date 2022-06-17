import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../model/message.entity';
import { IPagination } from '../../profile/interfaces/get-profile-query.interface';
import { Repository } from 'typeorm';
import { CreateMessageDto } from '../dto/create-message.dto';
import { RoomService } from './room.service';
import { Profile } from '../../profile/models/profile.entity';
import {SemiProfileService} from "./semi-profile.service";

@Injectable()
export class MessageService {
  constructor(@InjectRepository(Message) private messageRepository: Repository<Message>,
              private roomService: RoomService, private profileService: SemiProfileService) {
  }

  async createMessage(message: CreateMessageDto): Promise<Message> {
    let room = await this.roomService.getRoom(message.roomId);
    let profile: Profile;
    // for (const joined of room.users) {
    //   if (joined.id != message.userId) {
    //     profile = await this.profileService.getUserProfile(joined.id);
    //   } else {
    //     throw new HttpException('нет пользователя', 400);
    //   }
    // }
    // for (const u of profile.likedUsers) {
    //   if (u.profile.user.id == message.userId) {
    //     if (u.mutually){
    //       return await this.messageRepository.save({
    //         ...message,
    //         user: { id: message.userId },
    //         room: { id: message.roomId },
    //       });
    //     }
    //   }
    //
    // }

    return await this.messageRepository.save({
      ...message,
      user: { id: message.userId },
      room: { id: message.roomId },
    });
   // throw new HttpException('Вас не лайкнули',403)
  }

  async getAllMessage(id: number, pagination: IPagination,newMessages?:boolean) {
    const limit = pagination?.limit || 10;
    const page = pagination?.page || 1;
    const offset = page * limit - limit;
    const query = this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.room', 'room')
      .where('room.id = :roomId', { roomId: id })
      .leftJoinAndSelect('message.user', 'user')
      .orderBy('message.createAt', 'DESC');
    if(newMessages){
      query.andWhere('message.read = :read',{read:false})
    }
    query.limit(limit);
    query.offset(offset);
    return query.getMany();
  }
}