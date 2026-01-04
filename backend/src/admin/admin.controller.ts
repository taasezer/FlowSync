import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('admin')
export class AdminController {
    constructor(private readonly prisma: PrismaService) { }

    @Get('stats')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    async getSystemStats() {
        const totalUsers = await this.prisma.user.count();
        const totalSessions = await this.prisma.focusSession.count();
        // Calculate total focus time
        const sessions = await this.prisma.focusSession.findMany();
        const totalDuration = sessions.reduce((acc, curr) => acc + (curr.duration || 0), 0);

        const usersData = await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                sessions: {
                    select: {
                        duration: true,
                        activityScore: true
                    }
                }
            }
        });

        const users = usersData.map(user => {
            const totalUserDuration = user.sessions.reduce((acc, sess) => acc + (sess.duration || 0), 0);
            const totalUserHours = Math.round((totalUserDuration / 3600) * 10) / 10; // Hours with 1 decimal

            const scores = user.sessions.filter(s => s.activityScore !== null).map(s => s.activityScore || 0);
            const avgEfficiency = scores.length > 0
                ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
                : 0;

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                totalHours: totalUserHours,
                efficiency: avgEfficiency
            };
        });

        return {
            totalUsers,
            totalSessions,
            totalDurationVariables: Math.round(totalDuration / 60), // in minutes
            users
        };
    }
}
