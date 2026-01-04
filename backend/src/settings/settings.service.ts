import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createSettingDto: CreateSettingDto) {
        if (!createSettingDto.userId) {
            throw new Error('User ID is required');
        }

        // Check if settings already exist for this user
        const existing = await this.prisma.userSettings.findUnique({
            where: { userId: createSettingDto.userId }
        });

        if (existing) {
            return this.update(existing.id, createSettingDto);
        }

        return this.prisma.userSettings.create({
            data: {
                userId: createSettingDto.userId,
                theme: createSettingDto.theme || 'system',
                notifications: createSettingDto.notifications ?? true,
                focusTemplates: createSettingDto.focusTemplates ?? {},
            },
        });
    }

    findAll() {
        return this.prisma.userSettings.findMany();
    }

    findOne(id: string) {
        return this.prisma.userSettings.findUnique({ where: { id } });
    }

    async findByUserId(userId: string) {
        return this.prisma.userSettings.findUnique({ where: { userId } });
    }

    update(id: string, updateSettingDto: UpdateSettingDto) {
        return this.prisma.userSettings.update({
            where: { id },
            data: updateSettingDto,
        });
    }

    remove(id: string) {
        return this.prisma.userSettings.delete({ where: { id } });
    }
}
