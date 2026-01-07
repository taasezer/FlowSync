
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GithubService } from '../github/github.service';

@Injectable()
export class WorkService {
    constructor(
        private prisma: PrismaService,
        private githubService: GithubService
    ) { }

    async getTeamActivity() {
        const users = await this.prisma.user.findMany({
            where: { githubUrl: { not: null } },
            select: { id: true, name: true, githubUrl: true, role: true }
        });

        const findings: any[] = [];
        const personas: any[] = [];

        await Promise.all(users.map(async (user) => {
            if (!user.githubUrl) return; // Explicit check for TS

            const username = this.githubService.extractUsername(user.githubUrl);
            if (!username) return;

            const [stats, activity] = await Promise.all([
                this.githubService.getUserStats(username),
                this.githubService.getRecentActivity(username)
            ]);

            if (stats) {
                personas.push({
                    name: user.name || username,
                    role: user.role === 'ADMIN' ? 'Senior Developer' : 'Developer',
                    experience: '2 yıl',
                    age: 25,
                    color: user.role === 'ADMIN' ? 'purple' : 'blue',
                    avatar: stats.avatarUrl,
                    bio: `${stats.todayCommits} commits today`,
                    githubUrl: user.githubUrl,
                    painPoints: ["Context Switching", "Toplantılar"],
                    needs: ["Otomatik Durum", "Deep Work"],
                    goals: ["Temiz Kod", "Verimlilik"],
                    quote: "Github üzerinde aktif geliştirme yapıyor.",
                    recentActivity: activity // Include raw activity for frontend graph
                });
            }

            if (activity && activity.length > 0) {
                activity.forEach((commit: any) => {
                    findings.push({
                        category: commit.repo,
                        insight: commit.message,
                        impact: 'Yüksek',
                        quote: `Commit by ${user.name || username}`,
                        date: commit.date,
                        url: commit.url
                    });
                });
            }
        }));

        // Sort findings by date desc
        findings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return { personas, findings: findings.slice(0, 20) };
    }


    async startWork(userId: string) {
        // Check if already working
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new BadRequestException('User not found');
        if (user.status === 'WORKING') {
            throw new BadRequestException('Already working');
        }

        // Close any open session
        await this.closeOpenSession(userId);

        // Fetch User Settings to determine Focus Mode
        const settings = await this.prisma.userSettings.findUnique({ where: { userId } });

        // Determine Focus Mode status
        // If social block or notifications block is on, OR intensity > 50, consider it a Focus Session
        const isFocusMode = settings ? (
            settings.focusBlockSocial ||
            settings.focusBlockNotify ||
            (settings.focusIntensity > 50)
        ) : false;

        const focusIntensity = settings ? settings.focusIntensity : 0;

        // Create new WORK session with settings data
        await this.prisma.workSession.create({
            data: {
                userId,
                type: 'WORK',
                startTime: new Date(),
                isFocusMode,
                focusIntensity
            }
        });

        // Update user status
        await this.prisma.user.update({
            where: { id: userId },
            data: { status: 'WORKING' }
        });

        return { status: 'WORKING' };
    }

    async startBreak(userId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new BadRequestException('User not found');
        if (user.status !== 'WORKING') {
            throw new BadRequestException('Can only take break when working');
        }

        await this.closeOpenSession(userId);

        await this.prisma.workSession.create({
            data: {
                userId,
                type: 'BREAK',
                startTime: new Date()
            }
        });

        await this.prisma.user.update({
            where: { id: userId },
            data: { status: 'BREAK' }
        });

        return { status: 'BREAK' };
    }

    async finishWork(userId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new BadRequestException('User not found');

        await this.closeOpenSession(userId);

        await this.prisma.user.update({
            where: { id: userId },
            data: { status: 'OFFLINE' }
        });

        return { status: 'OFFLINE' };
    }

    async getStatus(userId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) return { status: 'OFFLINE' };
        return { status: user.status };
    }

    private async closeOpenSession(userId: string) {
        const lastSession = await this.prisma.workSession.findFirst({
            where: { userId, endTime: null },
            orderBy: { startTime: 'desc' }
        });

        if (lastSession) {
            const endTime = new Date();
            const durationMinutes = (endTime.getTime() - lastSession.startTime.getTime()) / 1000 / 60;

            // Calculate Efficiency Score
            // Base score: 100%
            // Bonus: +10% if Focus Mode
            // Bonus: +Dependency on Intensity (max +20%)
            // Penalty: -10% if duration < 10 mins (too short)

            let efficiencyScore = 80; // Start baseline

            if (lastSession.type === 'WORK') {
                if (lastSession.isFocusMode) efficiencyScore += 10;
                if (lastSession.focusIntensity > 0) {
                    efficiencyScore += (lastSession.focusIntensity / 10); // +0 to 10
                }
                if (durationMinutes > 25) efficiencyScore += 5; // Pomodoro bonus
                if (durationMinutes < 10) efficiencyScore -= 20; // Too short penalty

                // Cap at 100
                efficiencyScore = Math.min(100, Math.max(0, Math.round(efficiencyScore)));
            } else {
                // Break session - efficiency irrelevant or handled differently
                efficiencyScore = 100;
            }

            await this.prisma.workSession.update({
                where: { id: lastSession.id },
                data: {
                    endTime,
                    efficiencyScore
                }
            });
        }
    }

    async getPerformanceStats(userId?: string) {
        // 7 days ago
        const date = new Date();
        date.setDate(date.getDate() - 7);
        date.setHours(0, 0, 0, 0);

        const where: any = {
            startTime: { gte: date },
            endTime: { not: null }
        };

        if (userId) {
            where.userId = userId;
        }

        const sessions = await this.prisma.workSession.findMany({
            where,
            orderBy: { startTime: 'asc' }
        });

        // Initialize weekly map with date-based keys
        const weekMap = new Map<string, { dayName: string, minutes: number }>(); // Date string -> {dayName, minutes}
        const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

        // Fill last 7 days with 0 using date strings as keys
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateKey = d.toISOString().split('T')[0]; // YYYY-MM-DD format
            const dayName = days[d.getDay()];
            weekMap.set(dateKey, { dayName, minutes: 0 });
        }

        let totalWorkMinutes = 0;
        let totalBreakMinutes = 0;

        // Process sessions
        sessions.forEach(s => {
            const start = new Date(s.startTime);
            const end = new Date(s.endTime!);
            const durationMs = end.getTime() - start.getTime();
            const minutes = Math.floor(durationMs / 1000 / 60);

            const dateKey = start.toISOString().split('T')[0];

            if (s.type === 'WORK') {
                totalWorkMinutes += minutes;
                const existing = weekMap.get(dateKey);
                if (existing) {
                    weekMap.set(dateKey, { ...existing, minutes: existing.minutes + minutes });
                }
            } else if (s.type === 'BREAK') {
                totalBreakMinutes += minutes;
            }
        });

        // Format for Recharts - chronological order
        const weeklyData = Array.from(weekMap.values()).map(entry => ({
            day: entry.dayName,
            minutes: entry.minutes
        }));

        const flowDistribution = [
            { name: 'Odaklanma', value: totalWorkMinutes },
            { name: 'Mola', value: totalBreakMinutes }
        ];

        // Calculate holistic metrics
        const totalMinutesTarget = 7 * 8 * 60; // 7 days * 8 hours
        const workSessions = sessions.filter(s => s.type === 'WORK');

        const totalEfficiencyScore = workSessions.reduce((sum, s) => sum + (s.efficiencyScore || 0), 0);
        const avgEfficiency = workSessions.length > 0 ? Math.round(totalEfficiencyScore / workSessions.length) : 0;

        const focusSessions = workSessions.filter(s => s.isFocusMode);
        const totalFocusMinutes = focusSessions.reduce((sum, s) => {
            const start = new Date(s.startTime);
            const end = new Date(s.endTime || new Date());
            return sum + Math.floor((end.getTime() - start.getTime()) / 1000 / 60);
        }, 0);

        return {
            weeklyData,
            flowDistribution,
            overview: {
                totalWorkMinutes,
                avgEfficiency,
                totalFocusMinutes,
                focusCount: focusSessions.length
            }
        };
    }
}
