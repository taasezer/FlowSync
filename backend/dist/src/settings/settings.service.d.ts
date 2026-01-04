import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createSettingDto: CreateSettingDto): Promise<{
        id: string;
        theme: string;
        notifications: boolean;
        focusTemplates: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        theme: string;
        notifications: boolean;
        focusTemplates: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserSettingsClient<{
        id: string;
        theme: string;
        notifications: boolean;
        focusTemplates: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findByUserId(userId: string): Promise<{
        id: string;
        theme: string;
        notifications: boolean;
        focusTemplates: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
    } | null>;
    update(id: string, updateSettingDto: UpdateSettingDto): import(".prisma/client").Prisma.Prisma__UserSettingsClient<{
        id: string;
        theme: string;
        notifications: boolean;
        focusTemplates: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserSettingsClient<{
        id: string;
        theme: string;
        notifications: boolean;
        focusTemplates: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
