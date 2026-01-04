import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
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
