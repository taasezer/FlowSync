import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    update(id: string, updateAnalyticsDto: UpdateAnalyticsDto): string;
    remove(id: string): string;
}
