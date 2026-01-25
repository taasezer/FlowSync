
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GithubService {
    private readonly logger = new Logger(GithubService.name);
    private cache = new Map<string, { data: any, timestamp: number }>();
    private readonly CACHE_TTL = 15 * 60 * 1000; // 15 minutes

    private getHeaders() {
        const token = process.env.GITHUB_TOKEN;
        const headers: any = {
            'User-Agent': 'FlowSync-App',
            'Accept': 'application/vnd.github.v3+json'
        };
        if (token) {
            headers['Authorization'] = `token ${token}`;
        }
        return headers;
    }

    private getFromCache(key: string) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
            return cached.data;
        }
        return null;
    }

    private setCache(key: string, data: any) {
        this.cache.set(key, { data, timestamp: Date.now() });
    }

    async getUserStats(username: string) {
        const cacheKey = `stats_${username}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) {
            this.logger.log(`Cache hit for ${username}`);
            return cached;
        }

        this.logger.log(`Fetching GitHub data for: ${username}`);

        try {
            const [profileRes, eventsRes] = await Promise.all([
                axios.get(`https://api.github.com/users/${username}`, { headers: this.getHeaders() }),
                axios.get(`https://api.github.com/users/${username}/events/public`, { headers: this.getHeaders() })
            ]);

            const profile = profileRes.data;
            const events = Array.isArray(eventsRes.data) ? eventsRes.data : [];

            this.logger.log(`Got ${events.length} events for ${username}`);

            // Calculate today's commits
            const today = new Date().toDateString();
            const todayCommits = events
                .filter((e: any) => e.type === 'PushEvent' && new Date(e.created_at).toDateString() === today)
                .reduce((acc: number, e: any) => acc + e.payload.size, 0);

            this.logger.log(`Today's commits for ${username}: ${todayCommits}`);

            const stats = {
                username: profile.login,
                avatarUrl: profile.avatar_url,
                publicRepos: profile.public_repos,
                followers: profile.followers,
                todayCommits
            };

            this.setCache(cacheKey, stats);
            return stats;
        } catch (error: any) {
            this.logger.error(`Failed to fetch GitHub data for ${username}: ${error.message}`);
            return null;
        }
    }

    extractUsername(url: string): string | null {
        if (!url) return null;
        try {
            const parts = url.split('/');
            return parts[parts.length - 1] || parts[parts.length - 2];
        } catch (e) {
            return null;
        }
    }

    async getRecentActivity(username: string) {
        const cacheKey = `activity_${username}`;
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        try {
            const eventsRes = await axios.get(`https://api.github.com/users/${username}/events/public`, { headers: this.getHeaders() });
            const events = Array.isArray(eventsRes.data) ? eventsRes.data : [];

            // Filter push events and extract commits
            const pushEvents = events.filter((e: any) => e.type === 'PushEvent');
            const commits = pushEvents.flatMap((e: any) =>
                (e.payload.commits || []).map((c: any) => ({
                    message: c.message,
                    repo: e.repo.name,
                    date: e.created_at,
                    url: `https://github.com/${e.repo.name}/commits/${c.sha}`
                }))
            );

            const result = commits.slice(0, 10); // Return top 10 most recent commits
            this.setCache(cacheKey, result);
            return result;
        } catch (error) {
            this.logger.error(`Failed to fetch activity for ${username}: ${error.message}`);
            return [];
        }
    }
}
