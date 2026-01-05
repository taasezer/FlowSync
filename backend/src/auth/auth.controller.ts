import { Controller, Post, Body, UseGuards, Get, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body) {
        // In a real app, use a LocalGuard to validate credentials first
        // Here we manually validate for simplicity
        console.log(`Login attempt for: ${body.email}`);
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            console.warn(`Login failed for ${body.email}: Invalid credentials`);
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() body) {
        return this.authService.register(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
