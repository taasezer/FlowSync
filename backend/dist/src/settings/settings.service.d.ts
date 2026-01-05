import { PrismaService } from '../prisma/prisma.service';
export declare class SettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSettings(userId: string): Promise<{
        id: string;
        userId: string;
        focusBlockSocial: boolean;
        focusBlockNotify: boolean;
        focusDimScreen: boolean;
        focusIntensity: number;
        breakAdaptive: boolean;
        breakWater: boolean;
        breakEyes: boolean;
        breakStretch: boolean;
        breakLong: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateSettings(userId: string, data: any): Promise<{
        id: string;
        userId: string;
        focusBlockSocial: boolean;
        focusBlockNotify: boolean;
        focusDimScreen: boolean;
        focusIntensity: number;
        breakAdaptive: boolean;
        breakWater: boolean;
        breakEyes: boolean;
        breakStretch: boolean;
        breakLong: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
