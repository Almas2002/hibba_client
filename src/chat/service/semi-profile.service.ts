import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Profile} from "../../profile/models/profile.entity";
import {Repository} from "typeorm";

@Injectable()
export class SemiProfileService{
    constructor(@InjectRepository(Profile) private profileRepository:Repository<Profile>) {}
    async getUserByProfileId(id: number) {
        return await this.profileRepository.findOne({where: {id}, relations: ["user"]})

    }
    async getUserProfile(userId: number) {
        return await this.profileRepository.findOne({
            where: {user: {id: userId}},
            relations: ['hobbies', 'category', 'gender', 'myLikes', 'religion', 'photos', 'avatar', 'region'],
        });
    }
}