import {
  Body,
  Controller, Delete,
  Get, Param,
  Post,
  Put, Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UserDecorator } from '../user/decorators/user.decorator';
import { ProfileService } from './profile.service';
import { FileService } from '../file/file.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { GetProfileQueryInterface, IPagination } from './interfaces/get-profile-query.interface';
import { LikeProfileDto } from './dto/like-profile.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { RemoveImageDto } from './dto/remove-image.dto';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller('profile')
export class ProfileController {
  constructor(private profileService:ProfileService,private fileService:FileService) {}
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('add-image')
  async addImage(@UserDecorator('id')userId: number, @UploadedFile('file')file: any) {
    const image = await this.fileService.createFile(file)
    return await this.profileService.addImagesToProfile({userId,image});
  }
  @ApiImplicitFile({ name: 'file', description: 'аватар можно добавить 7 фотографий' })
  @UseInterceptors(FileFieldsInterceptor(([{ name: 'file', maxCount: 7 }])))
  @Post('create-profile')
  async createProfile(@Body()profile: CreateProfileDto, @UserDecorator('id')id: number, @UploadedFiles()files: { file: any[] }) {
    profile = { ...profile,userId:id};
    return this.profileService.createProfile(profile, files.file);
  }
  @ApiOperation({description:"получить профиль по токену"})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  getUserProfile(@UserDecorator('id')id:number) {
    return this.profileService.getUserProfile(id);
  }
  @ApiOperation({description:"получить профили"})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('get-profiles')
  getProfiles(@Query()data: GetProfileQueryInterface,@UserDecorator('id')userId:number) {
    data = {...data,userId}
    return this.profileService.getProFiles(data);
  }
  @ApiOperation({description:"получить профилей"})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('like-profile')
  likeProfile(@Body()data: LikeProfileDto,@UserDecorator('id')userId:number) {
    data = {...data ,userId}
    return this.profileService.likeProfile(data);
  }
  @ApiOperation({description:"блокировать профиль"})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('block-profile/:id')
  blockProfile(@Param('id')profileId: number) {
    return this.profileService.blockUser(profileId);
  }
  @ApiOperation({description:"получить блокированных пользователей"})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('get-blocked-profiles')
  getBlockedProfiles(@Query()pagination: IPagination) {
    return this.profileService.getBlockedUsers(pagination);
  }

  @ApiOperation({description:"изменить аватар"})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('update-avatar')
  updateAvatar(@Body()dto: UpdateAvatarDto,@UserDecorator('id')id:number) {
    return this.profileService.updateAvatar(id, dto.photoId);
  }
  @ApiOperation({description:"удалить фотку"})
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete('remove-image')
  removeImage(@Body()dto:RemoveImageDto,@UserDecorator('id')id:number) {
    dto = {...dto,userId:id}
    return this.profileService.deleteImage(dto);
  }
}