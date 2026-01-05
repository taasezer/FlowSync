
import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('settings')
@UseGuards(AuthGuard('jwt'))
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) { }

    @Get()
    getSettings(@Request() req) {
        return this.settingsService.getSettings(req.user.id);
    }

    @Patch()
    updateSettings(@Request() req, @Body() body) {
        return this.settingsService.updateSettings(req.user.id, body);
    }
}
