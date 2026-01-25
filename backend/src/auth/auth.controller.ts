import { Controller, Post, Body, UseGuards, Get, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoggerService } from '../common/logger.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: LoggerService,
    ) { }

    @Post('login')
    async login(@Body() body) {
        this.logger.log(`Login attempt for: ${body.email}`, 'AuthController');
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            this.logger.warn(`Login failed for ${body.email}: Invalid credentials`, 'AuthController');
            throw new UnauthorizedException('Invalid credentials');
        }
        this.logger.log(`Login successful for: ${body.email}`, 'AuthController');
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() body) {
        this.logger.log(`Registration attempt for: ${body.email}`, 'AuthController');
        return this.authService.register(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
