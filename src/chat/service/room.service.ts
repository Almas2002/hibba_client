import {HttpException, Injectable} from '@nestjs/common';
import {User} from '../../user/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Room} from '../model/room.entity';
import {Repository} from 'typeorm';
import {IPagination} from '../../profile/interfaces/get-profile-query.interface';
import {ProfileService} from "../../profile/profile.service";
import {SemiProfileService} from "./semi-profile.service";

@Injectable()
export class RoomService {
    constructor(@InjectRepository(Room) private roomRepository: Repository<Room>, private profileService: SemiProfileService) {
    }

    async getRoomsForUser(userId: number, option?: IPagination) {
        const limit = option?.limit || 10;
        const page = option?.page || 1;
        const offset = page * limit - limit;
        const query = this.roomRepository
            .createQueryBuilder('room')
            .leftJoin('room.users', 'users')
            .where('users.id = :userId', {userId})
            .leftJoinAndSelect('room.users', 'all_users')
            .leftJoinAndSelect("all_users.profile", "profile")
            .leftJoinAndSelect("profile.avatar",'avatar')
            .orderBy('room.updatedAt', 'DESC')
            .limit(limit)
            .offset(offset);
        return await query.getMany();
    }

    async createRoom(creator: User, userId: number) {
        const profile = await this.profileService.getUserByProfileId(userId)
        if (!profile) {
            throw new HttpException("профиль не найден", 404)
        }
        let combination = creator.id + userId
        console.log(combination)
       // const candidate = await this.roomRepository.findOne({where:{combination},relations:["users","users.profile"]})
        const query = this.roomRepository.createQueryBuilder("room")
            .leftJoinAndSelect("room.users","users")
            .leftJoinAndSelect("users.profile","profile")
            .leftJoinAndSelect("profile.avatar","avatar")
            .where("room.combination = :combination",{combination})
        const candidate  = await query.getOne()
        if (candidate){
            return candidate
        }
        const room = await this.roomRepository.save({combination});
        room.users = [creator, profile.user];
        return  await this.roomRepository.save(room);
    }

    async getRoom(id: number): Promise<Room> {
        return await this.roomRepository.findOne({id}, {relations: ["joinedUsers", "joinedUsers.user"]});
    }
}