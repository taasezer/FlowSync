import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_API_URL || ''; // Relative path to use Vite proxy for WebSockets

export const socket = io(URL, {
    autoConnect: false,
    withCredentials: true,
});

export const connectSocket = () => {
    if (!socket.connected) {
        socket.connect();
    }
};

export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};
