import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { HobbyModule } from '../hobby/hobby.module';
import { Like } from './like.entity';
import { ProfilePhotos } from './profile-photos.entity';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile,Like,ProfilePhotos]),HobbyModule,FileModule],
  providers:[ProfileService],
  controllers:[ProfileController],
  exports:[ProfileService]
})
export class ProfileModule {}