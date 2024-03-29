import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Profile} from './models/profile.entity';
import {Repository} from 'typeorm';
import {CreateProfileDto} from './dto/create-profile.dto';
import {HobbyService} from '../hobby/hobby.service';
import {GetProfileQueryInterface, IPagination} from './interfaces/get-profile-query.interface';
import {Like} from './models/like.entity';
import {LikeProfileDto} from './dto/like-profile.dto';
import {ProfilePhotos} from './profile-photos.entity';
import {UpdateProfileDto} from './dto/update-profile.dto';
import {AddImagesDto} from './dto/add-images.dto';
import {RemoveImageDto} from './dto/remove-image.dto';
import {FileService} from '../file/file.service';
import {Region} from '../region/region.entity';
import {CategoryService} from '../category/category.service';
import {RegionService} from '../region/region.service';
import {ReligionService} from '../religion/religion.service';
import {GenderService} from '../gender/gender.service';
import {NotificationGatewayService} from "../notification/service/notification-gateway.service";
import {AuthService} from "../auth/auth.service";
import {CreateWorkerDto} from "./dto/create-worker.dto";
import {Place} from "./models/place.entity";
import {Block} from "./models/block.entity";
import {ProfileListDto} from "./dto/profile-list.dto";
import {UpdateWorkerDto} from "./dto/update-worker.dto";
import {ProfileNotFoundException} from "./exception/profile.exception";
import {Posts} from "../posts/entity/posts.entity";

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>,
                @InjectRepository(Like) private likeRepository: Repository<Like>
        , private hobbyService: HobbyService, @InjectRepository(ProfilePhotos) private profilePhotosRepository: Repository<ProfilePhotos>,
                private fileService: FileService, private categoryService: CategoryService, private regionService: RegionService,
                private religionService: ReligionService, private genderService: GenderService, private notificationService: NotificationGatewayService
        , private authService: AuthService, @InjectRepository(Place) private placeRepository: Repository<Place>,
                @InjectRepository(Block) private blockRepository: Repository<Block>) {
    }

    async createProfile(data: CreateProfileDto, file: any[]) {

        const images: string[] = [];
        const candidate = await this.profileRepository.findOne({id: data.userId});
        if (candidate) {
            throw new HttpException('у вас уже есть профиль', 400);
        }
        const candidateCategory = await this.categoryService.findOne(data.categoryId);
        const candidateRegion = await this.regionService.findOne(data.regionId);
        const candidateReligion = await this.religionService.findOne(data.religionId);
        const candidateGender = await this.genderService.findOne(data.genderId);

        if (!candidateCategory || !candidateGender || !candidateRegion || !candidateReligion) {
            throw new HttpException('вы не правильно дали парметры,может быть не правильно дан категория,регион,гендер или религия', 400);
        }
        const profile = await this.profileRepository.save({
            ...data,
            user: {id: data.userId},
            region: {id: data.regionId},
            gender: {id: data.genderId},
            category: {id: data.categoryId},
            religion: {id: data.religionId},
        });
        await this.blockRepository.save({userProfile: profile})
        if (file?.length) {
            for (const f of file) {
                images.push(await this.fileService.createFile(f));
            }
        }
        let hobby;
        profile.hobbies = [];
        if (data.hobby?.length) {
            const len = data.hobby.split(',')
            for (const h of len) {
                hobby = await this.hobbyService.getOneHobby(+h);
                if (hobby) {
                    profile.hobbies.push(hobby);
                }
            }
        }
        let photo;
        if (file?.length) {
            for (let i = 0; i < images.length; i++) {
                if (i == 0) {
                    photo = await this.profilePhotosRepository.save({image: images[i], profile});
                } else {
                    await this.profilePhotosRepository.save({image: images[i], profile});
                }

            }
            await this.updateAvatar(data.userId, photo.id)
        }

        await this.profileRepository.save(profile);

    }

    async getUserProfile(userId: number) {
        //'myLikes', 'likedUsers','likedUsers.userProfile','userProfile.avatar','likedProfile.avatar'
        return await this.profileRepository.findOne({
            where: {user: {id: userId}},
            relations: ['hobbies', 'category', 'gender', 'myLikes',
                'religion', 'photos', 'avatar', 'region', 'user', 'block'],
        });
    }
    async createImagePost(post:Posts,image:string){
        await this.profilePhotosRepository.save({post,image})
    }
    async getProfileByUserId(id: number) {
        const profile = await this.profileRepository.findOne({where: {user: {id}}})
        if (!profile) {
            throw new ProfileNotFoundException()
        }
        return profile
    }

    async getLikes(id: number) {
        const profile = await this.profileRepository.findOne({where: {user: {id}}})
        const query = this.profileRepository.createQueryBuilder("profile")
            .leftJoinAndSelect("profile.likedUsers", 'likedUsers')
            .leftJoinAndSelect("likedUsers.userProfile", "userProfile")
            .leftJoinAndSelect("userProfile.avatar", "avatar")
            .andWhere("profile.id = :id", {id: profile.id})
        const data = await query.getOne()
        return data.likedUsers

    }

    async getUserByProfileId(id: number) {
        return await this.profileRepository.findOne({where: {id}, relations: ["user"]})

    }

    async updateProfile(dto: UpdateProfileDto) {
        const profile = await this.profileRepository.findOne({where: {id: dto.profileId}});
        profile.religion = {id: dto.religionId, value: '', profiles: []};
        profile.age = dto.age;
        profile.firstName = dto.firstName;
        profile.category = {id: dto.categoryId, gender: null, value: null, profiles: []};
        profile.secondName = dto.secondName;
        profile.description = dto.description;
        const region = new Region();
        region.id = dto.regionId;
        profile.region = region;
        return await this.profileRepository.save(profile);
    }

    async deleteImage(dto: RemoveImageDto) {
        const profile = await this.profileRepository.findOne({where: {userId: dto.userId}, relations: ['photos']});
        console.log(dto.imageId);
        await this.profilePhotosRepository.findOne({
            where: {
                id: dto.imageId,
                profile,
            },
        });
        return await this.profilePhotosRepository.delete({profile, id: dto.imageId});
    }

    async addImagesToProfile(dto: AddImagesDto) {
        const profile = await this.profileRepository.findOne({where: {userId: dto.userId}});
        return await this.profilePhotosRepository.save({image: dto.image, profile});
    }

    async getProFiles(data: GetProfileQueryInterface) {
        const limit = data?.limit || 10;
        const page = data?.page || 1;
        const offset = page * limit - limit;
        const profile = await this.getUserProfile(data.userId);
        const query = this.profileRepository.createQueryBuilder('profile')
            .leftJoinAndSelect('profile.hobbies', 'hobbies')
            .leftJoinAndSelect('profile.gender', 'gender')
            .leftJoinAndSelect('profile.category', 'category')
            .leftJoinAndSelect('profile.religion', 'religion')
            .leftJoinAndSelect('profile.region', 'region')
            .leftJoinAndSelect('profile.avatar', 'avatar')
            .leftJoinAndSelect('profile.photos', 'photos')
            .andWhere("profile.id != :id", {id: profile.id})
            .andWhere("profile.genderId != :genderId", {genderId: profile.gender.id})

        query.limit(limit);
        query.offset(offset);

        if (data.hobby) {
            const ids = data.hobby.split(",")
            query.andWhere('hobbies.id IN (:...hobbies)', {
                hobbies: ids,
            });
        }
        if (data?.region) {
            query.andWhere('profile.regionId = :regionId', {regionId: data.region});
        }
        if (data.religion) {
            query.andWhere('profile.religionId = :religionId ', {religionId: data.religion});
        }

        if (data?.category) {
            console.log(`here`)
            query.andWhere('profile.categoryId = :categoryId ', {categoryId: data.category});
        }
        if (data.ageTo) {
            query.andWhere('profile.age <= :ageTo ', {ageTo: data.ageTo,});
        }
        if (data?.ageFrom) {
            query.andWhere('profile.age >= :ageFrom', {ageFrom: data.ageFrom,});
        }
        if (data?.block) {
            query.andWhere('profile.block = :block', {block: data.block});
        }
        if (data?.search) {
            query.andWhere('profile.firstName ILIKE :firstName', {firstName: `%${data.search}%`,})
            query.andWhere('profile.secondName ILIKE :secondName', {secondName: `%${data.search}%`})
        }
        if (data?.kids === false) {
            query.andWhere('profile.kids = :amount', {amount: 0});
        }
        if (data?.kids) {
            query.andWhere('profile.kids <> :amountK', {amountK: 0});
        }
        const profiles = await query.getMany();
        const count = await query.getCount();
        return {profiles, count};
    }

    async likeProfile(dto: LikeProfileDto) {
        let candidateProfile = await this.profileRepository.findOne({where: {id: dto.profileId}, relations: ["user"]});
        if (!candidateProfile) {
            throw new HttpException({message: 'такого профиля нету'}, HttpStatus.BAD_REQUEST);
        }
        let userProfile = await this.profileRepository.findOne({where: {user: {id: dto.userId}}});
        if (!userProfile) {
            throw new HttpException({message: 'вы полностью не зарегестрировались'}, HttpStatus.BAD_REQUEST);
        }
        if (userProfile?.id == candidateProfile.id) {
            throw new HttpException({message: 'вы не можете лайкнуть себя'}, HttpStatus.BAD_REQUEST);
        }
        let profile = await this.likeRepository.findOne({
            where: {
                likedProfile: {id: dto.profileId},
                userProfile: {id: userProfile.id},
            }
        });


        let candidate = await this.likeRepository.findOne({
            where: {
                likedProfile: {id: userProfile.id},
                userProfile: {id: dto.profileId},
            },
        });

        if (profile) {
            await this.likeRepository.delete({id: profile.id})
            return;
        }
        if (candidate) {
            candidate.mutually = true;
            await this.likeRepository.save(candidate);
            return await this.likeRepository.save({
                userProfile: {id: userProfile.id},
                likedProfile: {id: dto.profileId},
                mutually: true,
            });
        }
        const like = await this.likeRepository.save({userProfile, likedProfile: {id: candidateProfile?.id}});
        await this.notificationService.likeNotification(`Вас лайкнули ${userProfile?.firstName}!`, like, candidateProfile.user)
        return like
    }


    async blockUser(id: number, workerId: number, text: string) {
        const profile = await this.profileRepository.findOne({id});
        const workerProfile = await this.profileRepository.findOne({where: {user: {id: workerId}}})
        const block = await this.blockRepository.findOne({where: {userProfile: profile}})
        block.block = !block.block
        block.text = text
        block.workerProfile = workerProfile
        await this.blockRepository.save(block)
    }

    async getBlockedUsers(pagination: IPagination) {
        const limit = pagination?.limit || 10;
        const page = pagination?.page || 1;
        const offset = page * limit - limit;
        const query = this.profileRepository.createQueryBuilder('profile')
            .leftJoinAndSelect("profile.block", "block")
            .leftJoinAndSelect("block.workerProfile", "workerProfile")
            .andWhere('block.block = :block', {block: true});
        query.limit(limit);
        query.offset(offset);
        return await query.getManyAndCount();
    }

    async getOneUser(id: number) {
        return await this.profileRepository.findOne({
            where: {id},
            relations: ["block", "block.workerProfile", "region", "category", "hobbies", "gender",
                "complaints", "sendReports", "complaints.reporter", "sendReports.culprit", "complaints.message", "sendReports.message"]
        })
    }

    async updateAvatar(userId: number, photoId: number) {
        const profile = await this.profileRepository.findOne({where: {user: {id: userId}}});
        const photo = await this.profilePhotosRepository.findOne({where: {id: photoId}, relations: ["profile"]});

        if (!photo) {
            throw new HttpException("Не найден фото", 404)
        }
        if (profile.id != photo.profile.id) {
            throw new HttpException("это не ваше фото", 400)
        }
        profile.avatar = photo
        await this.profileRepository.save(profile);
    }

    async getStatisticAge(from: number, to?: number,) {
        const query = this.profileRepository.createQueryBuilder("profile")
        if (to) {
            query.select(`COUNT(profile.age)`, `count`)
                .andWhere("profile.age >= :from AND profile.age < :to", {from, to})
        } else {
            query.select(`COUNT(profile.age)`, `count`)
                .andWhere("profile.age >= :from", {from})
        }
        const {count} = await query.getRawOne()
        return count
    }

    private async getCountProfiles() {
        return await this.profileRepository.createQueryBuilder("count")
            .leftJoin("count.user", "user")
            .leftJoin("user.roles", "roles")
            .andWhere("roles.value <> :role", {role: "WORKER"})
            .getCount()
    }

    async getStatisticCity(city?: string, another?: string[]) {
        const query = this.profileRepository.createQueryBuilder("profile")
            .leftJoin("profile.region", "region")
            .select("count(profile.id)", "count")
            .addSelect("region.value", "value")
            .groupBy("region.value")
        return await query.getRawMany()

    }

    async getStatisticsStatus() {
        const query = this.profileRepository.createQueryBuilder("profile")
            .leftJoin("profile.category", "category")
            .select("count(profile.id)", "count")
            .addSelect("category.value", "value")
            .groupBy("category.value")
        return await query.getRawMany()

    }

    async getStatisticsGender() {
        const query = this.profileRepository.createQueryBuilder("profile")
            .leftJoin("profile.gender", "gender")
            .select("count(profile.id)", "count")
            .addSelect("gender.value", "value")
            .groupBy("gender.value")
        return await query.getRawMany()

    }

    async getStatisticsHobby() {
        const query = this.profileRepository.createQueryBuilder("profile")
            .leftJoin("profile.hobbies", "hobby")
            .select("count(profile.id)", "count")
            .addSelect("hobby.value", "value")
            .groupBy("hobby.value")
        return await query.getRawMany()

    }

    async getStatisticsReligion() {
        const query = this.profileRepository.createQueryBuilder("profile")
            .leftJoin("profile.religion", "religion")
            .select("count(profile.id)", "count")
            .addSelect("religion.value", "value")
            .groupBy("religion.value")
        return await query.getRawMany()

    }

    async statisticAge() {
        const count = await this.getCountProfiles()  //100

        const range1822 = await this.getStatisticAge(18, 22) / +count
        const range2225 = await this.getStatisticAge(22, 25) / +count
        const range2530 = await this.getStatisticAge(25, 30) / +count
        const range3040 = await this.getStatisticAge(30, 40) / +count
        const range4050 = await this.getStatisticAge(40, 50) / +count
        const range5065 = await this.getStatisticAge(50, 65) / +count
        const range65 = await this.getStatisticAge(65) / +count
        return {range1822, range2225, range2530, range3040, range4050, range5065, range65}

    }

    async statistics() {
        const ages = await this.statisticAge()
        const religions = await this.getStatisticsReligion()
        const genders = await this.getStatisticsGender()
        const hobbies = await this.getStatisticsHobby()
        const status = await this.getStatisticsStatus()
        const cities = await this.getStatisticCity()
        const count = await this.getCountProfiles()
        return {ages, religions, genders, hobbies, status, cities, count}
    }

    async createWorker(dto: CreateWorkerDto) {
        const date = new Date(dto.date)
        const user = await this.authService.createWorker({password: dto.password, phone: dto.phone})
        const profile = await this.profileRepository.save({user, description: "", age: 0, date, ...dto,})
        await this.blockRepository.save({userProfile: profile})
        await this.placeRepository.save({profile, city: {id: dto.cityId}, ...dto})
    }

    async getWorkers() {
        const query = await this.profileRepository.createQueryBuilder("profile")
            .select('profile.id')
            .addSelect('profile.firstName')
            .addSelect('profile.secondName')
            .addSelect('profile.iin')
            .leftJoin('profile.user', 'user')
            .addSelect('user.phone')
            .leftJoinAndSelect('user.roles', 'roles')
            .andWhere('roles.value = :WORKER', {WORKER: "WORKER"})
            .groupBy('profile.id')
            .addGroupBy('user.id')
            .addGroupBy('roles.id')

        return await query.getMany()
        //name fisrtname secondname iin role
    }

    async getOneWorker(id: number) {
        return await this.profileRepository.findOne({
            where: {id},
            relations: ["place", "user", "place.city", "block", "block.workerProfile"]
        })
    }

    async getMyBlockProfiles(id: number, param: boolean = false) {
        let profile
        if (!param) {
            profile = await this.profileRepository.findOne({where: {user: {id}}})
        } else {
            profile = await this.profileRepository.findOne({where: {id}})
        }
        const query = this.profileRepository.createQueryBuilder("profile")
            .leftJoinAndSelect("profile.block", "block")
            .leftJoinAndSelect("profile.avatar", "avatar")
            .leftJoin("block.workerProfile", "workerProfile")
            .andWhere("workerProfile.id = :id", {id: profile.id})
            .andWhere("block.block = :block", {block: true})
        return await query.getMany()
    }

    async blockWorker(id: number, workerId: number, text: string) {
        const profile = await this.profileRepository.findOne({id})
        const block = await this.blockRepository.findOne({where: {userProfile: profile}})
        if (block.block) {
            throw new HttpException("этот пользователь уже заблокирован!", 400)
        }
        block.workerProfile = await this.profileRepository.findOne({where: {user: {id: workerId}}});
        block.text = text
        block.block = true
        await this.blockRepository.save(block)
    }

    async profileListAdmin(dto: ProfileListDto) {
        const limit = dto?.limit || 10
        const page = dto?.page || 1
        const offset = page * limit - limit
        const query = this.profileRepository.createQueryBuilder("profile")
            .leftJoinAndSelect("profile.block", "block")
            .leftJoinAndSelect("profile.user", "user")
        if (dto?.firstName) {
            query.andWhere("profile.firstName ILIKE :firstName", {firstName: `%${dto.firstName}%`})
        }
        if (dto?.secondName) {
            query.andWhere("profile.secondName ILIKE :secondName", {secondName: `%${dto.secondName}%`})
        }
        if (dto?.phone) {
            query.andWhere("user.phone ILIKE :phone", {phone: `%${dto.phone}%`})
        }
        query.limit(limit)
        query.offset(offset)
        const profiles = await query.getMany()
        const count = await query.getCount()
        return {profiles, count}
    }

    async updateWorker(id: number, dto: UpdateWorkerDto) {
        const profile = await this.profileRepository.findOne({user: {id}})
        profile.firstName = dto.firstName
        profile.secondName = dto.secondName
        profile.middleName = dto.middleName
        const place = await this.placeRepository.findOne({where: {profile}})
        place.apartment = dto.apartment;
        place.floor = dto.floor
        place.index = dto.index
        place.building = dto.building
        if (dto.cityId) {
            place.city = await this.regionService.findOne(dto.cityId)
        }
        await this.profileRepository.save(profile)
        await this.placeRepository.save(place)
    }


}