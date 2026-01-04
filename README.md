# FlowSync

FlowSync is a productivity platform designed to help users track their focus sessions and maintain deep work states. It integrates real-time tracking, focus management, and user settings customization.

## Key Features

- Real-time Activity Dashboard: Visualizes user activity levels.
- Focus Mode: Blocks distractions and tracks deep work sessions.
- Smart Settings: Manages notification preferences across integrated platforms.
- Analytics: Detailed reports on productivity trends.

## Technology Stack

- Backend: NestJS (TypeScript), Prisma ORM, PostgreSQL, Socket.io
- Frontend: React (Vite), TypeScript, TailwindCSS, Shadcn/UI, TanStack Query, Zustand
- Infrastructure: Docker

## How to Run

### 1. Database Setup

Ensure Docker is running.

docker-compose up -d
cd backend
npx prisma migrate dev
npx prisma generate

### 2. Backend Setup

cd backend
npm install
npm run start:dev

The backend will run on http://localhost:3000 (API accessible at /api).

### 3. Frontend Setup

In the root directory:

npm install
npm run dev

The frontend will run on http://localhost:5173.
API requests are automatically proxied to the backend.
