import {forwardRef, HttpException, Inject, Injectable} from '@nestjs/common';
import {User} from '../../user/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Room} from '../model/room.entity';
import {Repository} from 'typeorm';
import {SemiProfileService} from "./semi-profile.service";
import {NotificationGatewayService} from "../../notification/service/notification-gateway.service";
import {GenerateTokenDto} from "../dto/generate-token.dto";
import {RtcRole, RtcTokenBuilder} from 'agora-access-token'
import {AgoraChannel} from "../model/agora-channel.entity";
import {CreateChatDto} from "../dto/create-chat.dto";
import {EndCallDto} from "../dto/end-call.dto";
import {NotificationType} from "../../notification/notification.entity";

@Injectable()
export class RoomService {
    constructor(@InjectRepository(Room) private roomRepository: Repository<Room>, private profileService: SemiProfileService, @Inject(forwardRef(() => NotificationGatewayService)) private notification: NotificationGatewayService
        , @InjectRepository(AgoraChannel) private channelRepository: Repository<AgoraChannel>) {
    }

    async getRoomsForUser(userId: number) {
        const query = this.roomRepository
            .createQueryBuilder('room')

            .leftJoin("room.messages", "messages",).limit(1)
            // .addSelect((subQuery)=>{
            //     return subQuery.select("messages.text","text").from(Message,"message").limit(1)
            // },"text")
            // .addSelect((subQuery)=>{
            //     return subQuery.select("messages.createAt","createAt").from(Message,"message").limit(1)
            // },"createAt")
            .addSelect("messages").addOrderBy("messages.createAt", "DESC").limit(1)
            .leftJoin('room.users', 'users')
            .where('users.id = :userId', {userId})
            .leftJoinAndSelect('room.users', 'all_users',).limit(2)
            .leftJoinAndSelect("all_users.profile", "profile")
            .leftJoinAndSelect("profile.avatar", 'avatar')
            .leftJoinAndSelect("room.channel","channel")
            //.subQuery().from(Message,"messages").select("messages.text","text").limit(1)

            .orderBy('room.createAt', 'DESC')
            .addOrderBy("messages.id", "DESC")
        return await query.getMany()


    }

    async createRoom(creator: User, dto: CreateChatDto) {
        const profile = await this.profileService.getUserByProfileId(dto.profileId)
        if (!profile) {
            throw new HttpException("профиль не найден", 404)
        }
        const creatorProfile = await this.profileService.getUserProfile(creator.id)
        let combination = creator.id + dto.profileId
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
        const token = await this.generateToken({uuid: dto.uuid, role: dto.role, channelName: `${room.id}`})
        await this.channelRepository.save({room, token: token.rtcToken})
        const r2 = await this.roomRepository.findOne({where: {id: room.id}, relations: ["users", "users.profile","channel"]})
        for (const user of r2.users) {
            if (creator.id != user.id)
                await this.notification.roomNotification(`вам хочет написать ${creatorProfile?.firstName}`, room, profile.user)
        }

        return r2
    }

    async getRoom(id: number): Promise<Room> {
        return await this.roomRepository.findOne({id}, {relations: ["joinedUsers", "joinedUsers.user", "users", "channel"]});
    }

    async generateToken(dto: GenerateTokenDto) {
        if (!dto.channelName) {
            throw new HttpException("channel name is required ", 422)
        }
        let role = RtcRole.SUBSCRIBER
        if (dto.role === 'publisher') {
            role = RtcRole.PUBLISHER
        }

        // if(!dto.uuid){
        //     throw new HttpException("uuid is required ", 422)
        // }

        let expireTime = 60 * 60 * 24 * 30 * 12

        const currentTime = Math.floor(Date.now() / 1000);
        const privilegeExpireTime = currentTime + expireTime;

        const rtcToken = await RtcTokenBuilder.buildTokenWithUid(process.env.AGORA_APP_ID, process.env.AGORA_APP_CERTIFICATE, dto.channelName, dto.uuid, role, privilegeExpireTime);
        // const rtmToken =  await  RtmTokenBuilder.buildToken(process.env.AGORA_APP_ID,process.env.AGORA_APP_CERTIFICATE, "fdss", role, privilegeExpireTime);
        // console.log(rtmToken)
        return {rtcToken}
    }

    async call(userId: number, type: number, firstName: string) {
        let typeOfCall = 'аудиозвоноку'
        if (type === 1) {
            typeOfCall = 'видеозвонку'
        }
        await this.notification.callNotification(`вам звонит по ${typeOfCall}: ${firstName}`, userId,NotificationType.CALL)
    }

    async endCall(dto: EndCallDto) {
        await this.notification.callNotification(`вам откнонил звонок: ${dto.firstName}`, dto.userId, NotificationType.ENDCALL)
    }
}