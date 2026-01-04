import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { Server, Socket } from 'socket.io';
export declare class AnalyticsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly analyticsService;
    server: Server;
    constructor(analyticsService: AnalyticsService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    create(createAnalyticsDto: CreateAnalyticsDto): Promise<{
        id: string;
        startTime: Date;
        endTime: Date | null;
        duration: number | null;
        activityScore: number | null;
        userId: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            email: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        startTime: Date;
        endTime: Date | null;
        duration: number | null;
        activityScore: number | null;
        userId: string;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ActivitySessionClient<{
        id: string;
        startTime: Date;
        endTime: Date | null;
        duration: number | null;
        activityScore: number | null;
        userId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(updateAnalyticsDto: UpdateAnalyticsDto): string;
    remove(id: string): string;
}
