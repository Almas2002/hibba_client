import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {UserLoginDto} from './dto/user-login.dto';


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'login пользователя'})
    @ApiResponse({status: 201})
    @Post('login')
    async login(@Body()data: UserLoginDto, @Res({passthrough: true})res) {
        const response = await this.authService.login(data);
        res.cookie('refreshToken', response.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return response
    }

    @ApiOperation({summary: 'registration пользователя'})
    @ApiResponse({status: 201})
    @Post('registration')
    async registration(@Body()data: UserLoginDto, @Res({passthrough: true})res) {
        const response = await this.authService.registration(data);

        res.cookie('refreshToken', response.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return response;
    }

    @ApiOperation({summary: 'refresh пользователя'})
    @ApiResponse({status: 201})
    @Get('refresh')
    async refresh(@Req()request, @Res({passthrough: true})response) {
        const {refreshToken} = request.cookies;
        const res = await this.authService.refresh(refreshToken);
        response.cookie('refreshToken', response.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res.access_token;
    }

    @ApiOperation({summary: 'refresh for Azim'})
    @ApiResponse({status: 201})
    @Post('refresh')
    async AzimRefresh(@Body('refresh_token')refreshToken: string,@Body('push_token')push_token: string, @Res({passthrough: true})response) {
        const res = await this.authService.refresh(refreshToken,push_token);
        response.cookie('refreshToken', response.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return res;
    }

    @ApiOperation({summary: 'logout пользователя'})
    @ApiResponse({status: 201})
    @Get('logout')
    async logout(@Req()request, @Res({passthrough: true})response) {
        const {refreshToken} = request.cookies;
        response.clearCookie('refresh_token');
        await this.authService.logout(refreshToken);
    }

    @ApiOperation({summary: 'создать супер админа пользователя'})
    @ApiResponse({status: 201})
    @Post('create-super-user')
    async createSuperUser(@Res({passthrough: true})res) {
        const data = {
            phone: process.env.ADMIN_PHONE,
            password: process.env.ADMIN_PASSWORD,
        };
        console.log(data)
        const response = await this.authService.registration(data, true);
        res.cookie('refreshToken', response.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        return response;
    }

}