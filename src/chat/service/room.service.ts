import { Injectable } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../model/room.entity';
import { Repository } from 'typeorm';
import { IPagination } from '../../profile/interfaces/get-profile-query.interface';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>) {
  }

  async getRoomsForUser(userId: number, option: IPagination) {
    const limit = option?.limit || 10;
    const page = option?.page || 1;
    const offset = page * limit - limit;
    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoin('room.users', 'users')
      .where('users.id =:userId', { userId })
      .leftJoinAndSelect('room.users', 'all_users')
      .orderBy('room.updatedAt', 'DESC')
      .limit(limit)
      .offset(offset);
    return await query.getMany();
  }

  async createRoom(creator: User, user: User) {
    const room = await this.roomRepository.save({});
    room.users = [creator, user];
    return await this.roomRepository.save(room);
  }

  async getRoom(id: number): Promise<Room> {
    return await this.roomRepository.findOne({ id },{relations:["joinedUsers","joinedUsers.user"]});
  }
}