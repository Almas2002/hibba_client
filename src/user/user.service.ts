import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProfileDto } from './dto/create-profile.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy, private fileService: FileService) {
  }

  async getUserById(id: number) {
    const cmd = { cmd: 'get-one-user' };
    return await this.client.send(cmd, id).toPromise();
  }

  async createProfile(profile: CreateProfileDto, files: any[]) {
    const cmd = { cmd: 'create-profile' };
    let images: { name: string }[] = [];

    for (const file of files) {
      images.push({ name: await this.fileService.createFile(file) });
    }
    return await this.client.send(cmd, { profile, images }).toPromise();
  }

  async addImage(userId: number, file: any) {
    const cmd = { cmd: 'add-image' };
    const res = {
      userId,
      image: await this.fileService.createFile(file),
    };
    return await this.client.send(cmd, res).toPromise();
  }

}