
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

const TEST_USER_ID = '6af3b1e1-2862-443b-b03e-29b819514475';

export const useSettings = () => {
    return useQuery({
        queryKey: ['settings', TEST_USER_ID],
        queryFn: async () => {
            // In a real app we'd fetch by user ID or current session
            // For now, we are just creating/updating, so this GET might fail if we don't implement findByUserId on backend
            // Let's rely on mutation for now.
            return {};
        }
    });
}

export const useUpdateSettings = () => {
    return useMutation({
        mutationFn: async (data: { theme?: string; notifications?: boolean; focusTemplates?: any }) => {
            const response = await api.post('/settings', {
                ...data,
                userId: TEST_USER_ID,
            });
            return response.data;
        },
    });
};
