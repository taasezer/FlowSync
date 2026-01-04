import { useMutation } from '@tanstack/react-query';
import api from '../../lib/api';

// Temporary test user ID until refactor
const TEST_USER_ID = '6af3b1e1-2862-443b-b03e-29b819514475';

export const useCreateFocusSession = () => {
    return useMutation({
        mutationFn: async (data: { mode: string; duration?: number }) => {
            const response = await api.post('/focus', {
                ...data,
                userId: TEST_USER_ID,
                startTime: new Date().toISOString(),
            });
            return response.data;
        },
    });
};
