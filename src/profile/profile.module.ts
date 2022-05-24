import {forwardRef, Module} from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { HobbyModule } from '../hobby/hobby.module';
import { Like } from './like.entity';
import { ProfilePhotos } from './profile-photos.entity';
import { FileModule } from '../file/file.module';
import { CategoryModule } from '../category/category.module';
import { RegionModule } from '../region/region.module';
import { ReligionModule } from '../religion/religion.module';
import { GenderModule } from '../gender/gender.module';
import {NotificationModule} from "../notification/notification.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Profile,Like,ProfilePhotos]),HobbyModule,
    FileModule,CategoryModule,RegionModule,ReligionModule,GenderModule,forwardRef(()=>NotificationModule),AuthModule],
  providers:[ProfileService],
  controllers:[ProfileController],
  exports:[ProfileService]
})
export class ProfileModule {}