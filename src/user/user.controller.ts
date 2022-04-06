import {
  Body,
  Controller, Delete,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  Put,
  Query, UploadedFile, UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProfileDto } from './dto/create-profile.dto';
import { AuthGuard } from '../guard/auth.guard';
import { Role } from '../decorators/role.decorator';
import { RoleGuards } from '../guard/role.guard';
import { UserDecorator } from '../decorators/user.decorator';
import { GetProfileQueryInterface } from '../interface/get-profiles-query.interface';
import { RealIp, RealIP } from 'nestjs-real-ip/dist/src';
import { LikeProfileDto } from './dto/like-profile.dto';
import { IPagination } from '../interface/IPagination';
import { CreateReportDto } from './dto/create-report.dto';
import { UserService } from './user.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateGenderDto } from './dto/create-gender.dto';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

@ApiTags('Пользователь')
@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy,
              private userService: UserService) {
  }
  @Role('ADMIN')
  @UseGuards(RoleGuards)
  @Post('create-gender')
  @ApiBody({
    type: CreateGenderDto,
  })
  async createGender(@Body('value')value: string) {
    const cmd = { cmd: 'create-gender' };
    return await this.client.send(cmd, { value }).toPromise();
  }

  @Get('get-genders')
  async getGenders(@RealIP() ip: string, @RealIp()ip2: string) {
    const cmd = { cmd: 'get-genders' };
    return await this.client.send(cmd, {}).toPromise();
  }

  @Post('create-category')
  async createCategory(@Body('genderId')genderId: number, @Body('value')value: string) {
    const cmd = { cmd: 'create-category' };
    return await this.client.send(cmd, { genderId, value }).toPromise();
  }

  @Get('get-categories')
  async getCategories(@Query('genderId')genderId: number) {
    const cmd = { cmd: 'get-categories' };
    if (!genderId) {
      genderId = 0;
    }
    return await this.client.send(cmd, genderId).toPromise();
  }

  @Post('create-hobby')
  async createHobby(@Body('genderId')genderId: number, @Body('value')value: string) {
    const cmd = { cmd: 'create-hobby' };
    return await this.client.send(cmd, { value, genderId }).toPromise();
  }

  @Get('get-hobbies')
  async getHobbies(@Query('genderId')genderId: number) {
    if (!genderId) {
      genderId = 0;
    }
    const cmd = { cmd: 'get-hobbies' };
    return await this.client.send(cmd, genderId).toPromise();
  }

  @ApiImplicitFile({ name: 'file', description: 'аватар можно добавить 7 фотографий' })
  @UseInterceptors(FileFieldsInterceptor(([{ name: 'file', maxCount: 7 }])))
  @Post('create-profile')
  async createProfile(@Body()profile: CreateProfileDto, @UserDecorator('id')id: number, @UploadedFiles()files: { file: any[] }) {
    profile = { ...profile, userId: id };
    return this.userService.createProfile(profile, files.file);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@UserDecorator('id')id: number, @RealIp()ip: string) {
    const cmd = { cmd: 'me' };
    return await this.client.send(cmd, id).toPromise();
  }

  @UseGuards(AuthGuard)
  @Get('get-profiles')
  async getProfiles(@Query()query: Omit<GetProfileQueryInterface, 'userId'>, @UserDecorator('id')id: number) {
    const data: GetProfileQueryInterface = {
      ...query, userId: id,
    };

    const cmd = { cmd: 'get-profiles' };
    return await this.client.send(cmd, data).toPromise();
  }

  @UseGuards(AuthGuard)
  @Post('like-profile')
  async likeProfile(@Body()dto: LikeProfileDto, @UserDecorator('id')id: number) {
    dto.userId = id;
    const cmd = { cmd: 'like-profile' };
    return await this.client.send(cmd, dto).toPromise();
  }

  @Put('block-profile')
  async blockProfile(@Body('profileId')profileId: number) {
    const cmd = { cmd: 'block-profile' };
    return await this.client.send(cmd, profileId).toPromise();
  }

  @Get('get-blocked-profiles')
  async getBlockedProfile(@Query()dto: IPagination) {
    const cmd = { cmd: 'get-blocked-profiles' };
    return await this.client.send(cmd, dto).toPromise();
  }

  @Post('report-to-profile')
  async reportToProfile(@Body()dto: CreateReportDto, @UserDecorator('id')userId: number) {
    dto = { ...dto, userId };
    const cmd = { cmd: 'report-to-profile' };
    const data = await this.client.send(cmd, dto).toPromise();
    if (data?.message) {
      throw new HttpException(data.message, data.status);
    }
    return;
  }

  @Get('get-user-of-reports/:profileId')
  async getUserOfReports(@Param('profileId')profileId: number) {
    const cmd = { cmd: 'get-user-of-reports' };
    return await this.client.send(cmd, profileId).toPromise();
  }

  @Post('religion')
  async createReligion(@Body('value') value: string) {
    const cmd = { cmd: 'create-religion' };
    return await this.client.send(cmd, value).toPromise();
  }

  @Get('religion')
  async getReligions() {
    const cmd = { cmd: 'get-religions' };
    return await this.client.send(cmd, {}).toPromise();
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('add-image')
  async addImage(@UserDecorator('id')userId: number, @UploadedFile('file')file: any) {
    return await this.userService.addImage(userId, file);
  }

  @UseGuards(AuthGuard)
  @Delete('remove-image/:id')
  async removeImage(@Param('id')imageId: number, @UserDecorator('id')userId: number) {
    const cmd = { cmd: 'remove-image' };
    const data = {
      userId,
      imageId,
    };

    return await this.client.send(cmd, data).toPromise();
  }


  @UseGuards(AuthGuard)
  @Put('update-avatar')
  async updateAvatar(@Body()dto: UpdateAvatarDto, @UserDecorator('id')userId: number) {
    const data = {
      userId,
      photoId: dto.imageId,
    };
    const cmd = { cmd: 'update-avatar' };
    return await this.client.send(cmd, data).toPromise();
  }
}
