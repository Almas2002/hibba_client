import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  async getUserById(id: number) {
    const cmd = { cmd: 'get-one-user' };
    return await this.client.send(cmd, id).toPromise();
  }

}