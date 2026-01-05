
import axios from 'axios';

// Create base Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api', // Use /api prefix to trigger Vite proxy
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable if using cookies/sessions
});

// Request interceptor for API calls
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors (e.g., 401 Unauthorized, 500 Server Error)
        console.error('API Error:', error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
);

export default api;
