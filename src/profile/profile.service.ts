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

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>,
              @InjectRepository(Like) private likeRepository: Repository<Like>
    , private hobbyService: HobbyService, @InjectRepository(ProfilePhotos) private profilePhotosRepository: Repository<ProfilePhotos>, private fileService: FileService) {
  }

  async createProfile(data: CreateProfileDto, file: any[]) {
    const images: string[] = [];
    const profile = await this.profileRepository.save({
      ...data,
      region: { id: data.regionId },
      gender: { id: data.genderId },
      category: { id: data.categoryId },
      religion: { id: data.religionId },
    });
    if (file.length) {
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
      where: { userId },
      relations: ['hobbies', 'category', 'gender', 'myLikes', 'likedUsers', 'myLikes.likedProfile', 'likedUsers.profile', 'religion', 'photos', 'avatar'],
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
      .leftJoin('profile.hobbies', 'hobbies')
      .leftJoin('profile.gender', 'gender')
      .leftJoin('profile.category', 'category')
      .leftJoin('profile.religion', 'religion')
      .leftJoin('profile.region', 'region')
      .leftJoinAndSelect('profile.avatar', 'avatar')
      .andWhere('profile.userId <> :userId', { userId: data.userId })
      .andWhere('profile.block = :block', { block: false })
      .andWhere('gender.id =:id', { id: profile.gender.id === 1 ? 2 : 1 });

    if (data?.hobby && profile.hobbies.length) {
      query.andWhere('profile.hobbies IN (:...hobbies)', { hobbies: profile.hobbies });
    }
    if (data?.regionId) {
      query.andWhere('region.id = :id', { id: data.religion });
    }
    if (data?.religion && profile.religion) {
      query.andWhere('religion.id = :id', { id: profile.religion.id });
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
    if (data?.hobby && profile.category) {
      query.andWhere('category.id = :id', { id: profile.category.id });
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
    let userProfile = await this.profileRepository.findOne({ where: { userId: dto.userId } });
    let profile = await this.likeRepository.findOne({
      where: {
        profile: { id: dto.profileId },
        likedProfile: userProfile,
      },
    });
    let candidate = await this.likeRepository.findOne({
      where: {
        profile: userProfile,
        likedProfile: { id: dto.profileId },
      },
    });
    if (candidate) {
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
    const profile = await this.profileRepository.findOne({ where: { userId } });
    profile.avatar = await this.profilePhotosRepository.findOne({ where: { id: photoId } });
    await this.profileRepository.save(profile);
  }

}