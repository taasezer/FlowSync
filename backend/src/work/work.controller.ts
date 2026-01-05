
import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { WorkService } from './work.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('work')
@UseGuards(AuthGuard('jwt'))
export class WorkController {
    constructor(private readonly workService: WorkService) { }

    @Post('start')
    startWork(@Request() req) {
        return this.workService.startWork(req.user.id);
    }

    @Post('break')
    takeBreak(@Request() req) {
        return this.workService.startBreak(req.user.id);
    }

    @Post('finish')
    finishWork(@Request() req) {
        return this.workService.finishWork(req.user.id);
    }

    @Get('team-activity')
    getTeamActivity() {
        return this.workService.getTeamActivity();
    }

    @Get('performance')
    getPerformanceStats(@Request() req) {
        if (req.user.role === 'ADMIN') {
            return this.workService.getPerformanceStats();
        }
        return this.workService.getPerformanceStats(req.user.id);
    }

    @Get('status')
    getStatus(@Request() req) {
        return this.workService.getStatus(req.user.id);
    }
}
