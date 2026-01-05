import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { GithubService } from '../github/github.service';

@Controller('admin')
export class AdminController {
    constructor(
        private prisma: PrismaService,
        private githubService: GithubService
    ) { }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    @Get('stats')
    async getSystemStats() {
        // Fetch all users with session info
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                githubUrl: true,
                status: true,
                createdAt: true,
                sessions: {
                    select: {
                        duration: true,
                        activityScore: true
                    }
                }
            }
        });

        const usersWithStats = await Promise.all(users.map(async user => {
            const totalUserHours = user.sessions.reduce((acc, s) => acc + (s.duration || 0), 0) / 3600;
            const avgEfficiency = user.sessions.length > 0
                ? user.sessions.reduce((acc, s) => acc + (s.activityScore || 0), 0) / user.sessions.length
                : 0;

            let githubStats: any = null;
            let recentActivity: any[] = [];

            if (user.githubUrl) {
                const username = this.githubService.extractUsername(user.githubUrl);
                if (username) {
                    const [stats, activity] = await Promise.all([
                        this.githubService.getUserStats(username),
                        this.githubService.getRecentActivity(username)
                    ]);
                    githubStats = stats;
                    recentActivity = activity;
                }
            }

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                githubUrl: user.githubUrl,
                status: user.status,
                createdAt: user.createdAt,
                totalHours: totalUserHours,
                efficiency: avgEfficiency,
                githubStats: githubStats,
                recentActivity: recentActivity
            };
        }));

        const totalUsers = users.length;
        const totalSessions = await this.prisma.activitySession.count();
        const totalHours = usersWithStats.reduce((acc, u) => acc + u.totalHours, 0);

        return {
            overview: {
                totalUsers,
                totalSessions,
                totalHours
            },
            users: usersWithStats
        };
    }
}
