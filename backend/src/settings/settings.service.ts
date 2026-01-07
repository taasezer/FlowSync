
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
    constructor(private prisma: PrismaService) { }

    async getSettings(userId: string) {
        let settings = await this.prisma.userSettings.findUnique({
            where: { userId }
        });

        if (!settings) {
            settings = await this.prisma.userSettings.create({
                data: { userId }
            });
        }

        return settings;
    }

    async updateSettings(userId: string, data: any) {
        // Filter out read-only fields if necessary, but DTO validation usually handles this
        // For now, allow direct update of boolean/int fields
        const { id, userId: uid, createdAt, updatedAt, ...updateData } = data;

        // Use upsert to handle case where settings don't exist
        return this.prisma.userSettings.upsert({
            where: { userId },
            update: updateData,
            create: { userId, ...updateData }
        });
    }
}
