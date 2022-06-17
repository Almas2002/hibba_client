import {forwardRef, HttpException, Inject, Injectable} from '@nestjs/common';
import {User} from '../../user/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Room} from '../model/room.entity';
import {Repository} from 'typeorm';
import {IPagination} from '../../profile/interfaces/get-profile-query.interface';
import {SemiProfileService} from "./semi-profile.service";
import {NotificationGatewayService} from "../../notification/service/notification-gateway.service";

@Injectable()
export class RoomService {
    constructor(@InjectRepository(Room) private roomRepository: Repository<Room>, private profileService: SemiProfileService, @Inject(forwardRef(() => NotificationGatewayService)) private notification: NotificationGatewayService) {
    }

    async getRoomsForUser(userId: number) {
        const query = this.roomRepository
            .createQueryBuilder('room')
            .leftJoin('room.users', 'users')
            .where('users.id = :userId', {userId})
            .leftJoinAndSelect('room.users', 'all_users')
            .leftJoinAndSelect("all_users.profile", "profile")
            .leftJoinAndSelect("profile.avatar", 'avatar')
            .orderBy('room.createAt', 'DESC')
         return  await query.getMany()


    }

    async createRoom(creator: User, userId: number) {
        const profile = await this.profileService.getUserByProfileId(userId)
        if (!profile) {
            throw new HttpException("профиль не найден", 404)
        }
        const creatorProfile = await this.profileService.getUserProfile(creator.id)
        let combination = creator.id + userId
        // const candidate = await this.roomRepository.findOne({where:{combination},relations:["users","users.profile"]})
        const query = this.roomRepository.createQueryBuilder("room")
            .leftJoinAndSelect("room.users", "users")
            .leftJoinAndSelect("users.profile", "profile")
            .leftJoinAndSelect("profile.avatar", "avatar")
            .where("room.combination = :combination", {combination})
        const candidate = await query.getOne()
        if (candidate) {
            return candidate
        }

        const room = await this.roomRepository.save({combination});
        room.users = [creator, profile.user];
        await this.roomRepository.save(room);
        const r2 = await this.roomRepository.findOne({where: {id: room.id}, relations: ["users", "users.profile"]})
        for (const user of r2.users) {
            if (creator.id != user.id)
                await this.notification.roomNotification(`вам хочет написать ${creatorProfile?.firstName}`,room,profile.user)
        }
        return r2
    }

    async getRoom(id: number): Promise<Room> {
        return await this.roomRepository.findOne({id}, {relations: ["joinedUsers", "joinedUsers.user", "users"]});
    }
}