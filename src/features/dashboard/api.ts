import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

export interface ActivityData {
    time: string;
    activity: number; // Changed from level to activity to match UI
}

export interface WeeklyData {
    day: string;
    minutes: number; // Changed from focus to minutes to match UI
}

export const useActivityData = () => {
    return useQuery({
        queryKey: ['activity-data'],
        queryFn: async () => {
            const response = await api.get('/analytics');
            // Transform backend data to UI format
            // Assuming backend returns ActivitySession[]
            const sessions = response.data;
            if (!sessions || sessions.length === 0) return [];

            return sessions.slice(-5).map((s: any) => ({
                time: new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                activity: s.activityLevel
            }));
        }
    });
};

export const useWeeklyStats = () => {
    return useQuery({
        queryKey: ['weekly-stats'],
        queryFn: async () => {
            // For now, returning static data until backend aggregation endpoint is ready
            // TODO: Implement /analytics/weekly endpoint
            return [
                { day: 'Pzt', minutes: 120 },
                { day: 'Sal', minutes: 240 },
                { day: 'Çar', minutes: 180 },
                { day: 'Per', minutes: 300 },
                { day: 'Cum', minutes: 150 },
                { day: 'Cmt', minutes: 60 },
                { day: 'Paz', minutes: 90 },
            ] as WeeklyData[];
        }
    });
};
