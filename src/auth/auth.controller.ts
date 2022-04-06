import { Body, Controller, Get, HttpException, Inject, Post, Req, Res } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { ClientProxy } from '@nestjs/microservices';
import { SmsService } from '../sms/sms.service';
import { IpAddress } from '../decorators/ip.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy,private smsService:SmsService) {}

  @Post('login')
  async login(@Body()data: UserLoginDto, @Res({ passthrough: true })res,@IpAddress() ip) {
    const cmd = { cmd: 'log_in' };
    const response = await this.client.send(cmd, data).toPromise();
    res.cookie('refreshToken', response.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return { access_token: response .access_token };
  }

  @Post('registration')
  async registration(@Body()data: UserLoginDto, @Res({ passthrough: true })res) {
    const cmd = { cmd: 'registration' };
    const response = await this.client.send(cmd, data).toPromise();
    if (response.message) {
      throw new HttpException(response.message, response.status);
    }
    res.cookie('refreshToken', response.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return response;
  }

  @Get('refresh')
  async refresh(@Req()request, @Res({ passthrough: true })response) {
    const { refreshToken } = request.cookies;
    const cmd = { cmd: 'refresh_token' };
    const res = await this.client.send(cmd, refreshToken).toPromise();
    response.cookie('refreshToken', response.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return res.access_token;
  }

  @Get('logout')
  async logout(@Req()request, @Res({ passthrough: true })response) {
    const { refreshToken } = request.cookies;
    const cmd = { cmd: 'registration' };
    response.clearCookie('refresh_token');
    await this.client.send(cmd, refreshToken).toPromise();
  }

  @Post('create-super-user')
  async createSuperUser(@Res({ passthrough: true })res) {
    const cmd = { cmd: 'create-super-user' };
    const response = await this.client.send(cmd, {}).toPromise();
    if (response.message) {
      throw new HttpException(response.message, response.status);
    }
    res.cookie('refreshToken', response.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return response;
  }
}