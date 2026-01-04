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
            // Temporary mock
            return [
                { time: '09:00', activity: 45 },
                { time: '10:00', activity: 75 },
                { time: '11:00', activity: 30 },
            ] as ActivityData[];
        }
    });
};

export const useWeeklyStats = () => {
    return useQuery({
        queryKey: ['weekly-stats'],
        queryFn: async () => {
            // Temporary mock matching UI expectation
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
