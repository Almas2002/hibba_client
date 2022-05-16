import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { HobbyService } from '../hobby/hobby.service';
import { GetProfileQueryInterface, IPagination } from './interfaces/get-profile-query.interface';
import { Like } from './like.entity';
import { LikeProfileDto } from './dto/like-profile.dto';
import { ProfilePhotos } from './profile-photos.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AddImagesDto } from './dto/add-images.dto';
import { RemoveImageDto } from './dto/remove-image.dto';
import { FileService } from '../file/file.service';
import { Region } from '../region/region.entity';
import { CategoryService } from '../category/category.service';
import { RegionService } from '../region/region.service';
import { ReligionService } from '../religion/religion.service';
import { GenderService } from '../gender/gender.service';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>,
              @InjectRepository(Like) private likeRepository: Repository<Like>
    , private hobbyService: HobbyService, @InjectRepository(ProfilePhotos) private profilePhotosRepository: Repository<ProfilePhotos>,
              private fileService: FileService, private categoryService: CategoryService, private regionService: RegionService,
              private religionService: ReligionService, private genderService: GenderService) {
  }

  async createProfile(data: CreateProfileDto, file: any[]) {
    const images: string[] = [];
    const candidate = await this.profileRepository.findOne({ id: data.userId });
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
      user: { id: data.userId },
      region: { id: data.regionId },
      gender: { id: data.genderId },
      category: { id: data.categoryId },
      religion: { id: data.religionId },
    });

    if (file?.length) {
      for (const f of file) {
        images.push(await this.fileService.createFile(f));
      }
    }
    let hobby;
    profile.hobbies = [];
    if (data.hobby?.length) {
      for (const h of data.hobby) {
        hobby = await this.hobbyService.getOneHobby(h);
        if (hobby) {
          profile.hobbies.push(hobby);
        }
      }
    }
    if (file.length) {
      for (const image of images) {
        await this.profilePhotosRepository.save({ image: image, profile });
      }
    }
    await this.profileRepository.save(profile);
  }

  async getUserProfile(userId: number) {
    return await this.profileRepository.findOne({
      where: { user:{id:userId} },
      relations: ['hobbies', 'category', 'gender', 'myLikes', 'likedUsers', 'myLikes.likedProfile', 'likedUsers.profile', 'religion', 'photos', 'avatar', 'region'],
    });
  }

  async updateProfile(dto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({ where: { id: dto.profileId } });
    profile.religion = { id: dto.religionId, value: '', profiles: [] };
    profile.age = dto.age;
    profile.firstName = dto.firstName;
    profile.category = { id: dto.categoryId, gender: null, value: null, profiles: [] };
    profile.secondName = dto.secondName;
    profile.description = dto.description;
    const region = new Region();
    region.id = dto.regionId;
    profile.region = region;
    return await this.profileRepository.save(profile);
  }

  async deleteImage(dto: RemoveImageDto) {
    const profile = await this.profileRepository.findOne({ where: { userId: dto.userId }, relations: ['photos'] });
    console.log(dto.imageId);
    await this.profilePhotosRepository.findOne({
      where: {
        id: dto.imageId,
        profile,
      },
    });
    return await this.profilePhotosRepository.delete({ profile, id: dto.imageId });
  }

  async addImagesToProfile(dto: AddImagesDto) {
    const profile = await this.profileRepository.findOne({ where: { userId: dto.userId } });
    return await this.profilePhotosRepository.save({ image: dto.image, profile });
  }

  async getProFiles(data: GetProfileQueryInterface) {
    const limit = data.limit || 10;
    const page = data.page || 1;
    const offset = page * limit - limit;
    const profile = await this.getUserProfile(data.userId);
    const query = await this.profileRepository.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.hobbies', 'hobbies')
      .leftJoinAndSelect('profile.gender', 'gender')
      .leftJoinAndSelect('profile.category', 'category')
      .leftJoinAndSelect('profile.religion', 'religion')
      .leftJoinAndSelect('profile.region', 'region')
      .leftJoinAndSelect('profile.avatar', 'avatar')
      .leftJoinAndSelect('profile.photos', 'photos')
      .andWhere('profile.user_id <> :userId', { userId: data.userId })
      .andWhere('profile.block = :block', { block: false })
      .andWhere('gender.id =:id', { id: profile.gender.id === 1 ? 2 : 1 });

    if (data?.hobby && profile.hobbies.length) {
      query.andWhere('profile.hobbies IN (:...hobbies)', { hobbies: profile.hobbies });
    }
    if (data?.region) {
      query.andWhere('region.id = :id', { id: data.region });
    }
    if (data?.religion) {
      query.andWhere('religion.id = :id', { id: data.religion });
    }
    if (!data?.ageFrom && data.ageTo) {
      query.andWhere('profile.age <= :age ', { age: data.ageTo });
    }
    if (data?.ageFrom && !data.ageTo) {
      query.andWhere('profile.age >= :age ', { age: data.ageFrom });
    }
    if (data?.block) {
      query.andWhere('profile.block = :block', { block: data.block });
    }
    if (data?.ageFrom && data?.ageTo) {
      query.andWhere('profile.price >= :price2 AND profile.price <= :price', {
        price: data.ageTo,
        price2: data.ageFrom,
      });
    }
    if (data?.search) {
      query.andWhere('profile.firstName ILIKE :firstName OR profile.secondName ILIKE :secondName', {
        firstName: `%${data.search}%`,
        secondName: `%${data.search}%`,
      })
        // .andWhere('profile.userId <> :userId', { userId: data.userId })
        .andWhere('profile.block = :block', { block: false });
      //.andWhere('gender.id = any', { ids: ['1', '2'] });

    }
    if (data?.category) {
      query.andWhere('category.id = :id', { id: data.category });
    }
    query.limit(limit);
    query.offset(offset);

    const profiles = await query.getMany();
    const count = await query.getCount();
    return { profiles, count };
  }

  async likeProfile(dto: LikeProfileDto) {
    let candidateProfile = await this.profileRepository.findOne({ where: { id: dto.profileId } });
    if (!candidateProfile) {
      throw new HttpException({ message: 'такого профиля нету' }, HttpStatus.BAD_REQUEST);
    }
    let userProfile = await this.profileRepository.findOne({ where: { user: {id:dto.userId} } });
    let profile = await this.likeRepository.findOne({
      where: {
        profile: { id: dto.profileId },
        likedProfile: userProfile,
      }
    });
    if (userProfile.id ==candidateProfile.id){
      throw new HttpException({ message: 'вы не можете лайкнуть себя' }, HttpStatus.BAD_REQUEST);
    }

    let candidate = await this.likeRepository.findOne({
      where: {
        profile: userProfile,
        likedProfile: { id: dto.profileId },
      },
    });

    if (candidate) {
      await this.likeRepository.delete({id:candidate.id})
      profile.mutually = !profile.mutually;
      await this.likeRepository.save(profile);
      return;
    }
    if (profile) {
      profile.mutually = true;
      await this.likeRepository.save(profile);
      return await this.likeRepository.save({
        profile: userProfile,
        likedProfile: { id: dto.profileId },
        mutually: true,
      });
    }

    return await this.likeRepository.save({ profile: userProfile, likedProfile: { id: dto.profileId } });
  }

  async blockUser(id: number) {
    const profile = await this.profileRepository.findOne({ id });
    profile.block = !profile.block;
    await this.profileRepository.save(profile);
  }

  async getBlockedUsers(pagination: IPagination) {
    const limit = pagination?.limit || 10;
    const page = pagination?.page || 1;
    const offset = page * limit - limit;
    const query = this.profileRepository.createQueryBuilder('profile')
      .andWhere('profile.block = :block', { block: true });
    query.limit(limit);
    query.offset(offset);
    return await query.getManyAndCount();
  }

  async updateAvatar(userId: number, photoId: number) {
    const profile = await this.profileRepository.findOne({ where: { user:{id:userId} } });
    profile.avatar = await this.profilePhotosRepository.findOne({ where: { id: photoId } });
    await this.profileRepository.save(profile);
  }

}