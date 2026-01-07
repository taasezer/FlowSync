import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
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
                time: new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                activity: s.activityScore || 0
            }));
        }
    });
};

export const useWeeklyStats = () => {
    return useQuery({
        queryKey: ['weekly-stats'],
        queryFn: async () => {
            const res = await api.get('/work/performance');
            return res.data;
        }
    });
};

export const useTeamActivity = () => {
    return useQuery({
        queryKey: ['team-activity'],
        queryFn: async () => {
            const res = await api.get('/work/team-activity');
            return res.data;
        }
    });
};

export const useSettings = () => {
    return useQuery({
        queryKey: ['user-settings'],
        queryFn: async () => {
            const res = await api.get('/settings');
            return res.data;
        }
    });
};

export const useUpdateSettings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            const res = await api.patch('/settings', data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-settings'] });
        }
    });
};
