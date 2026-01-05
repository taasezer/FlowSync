import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSettings(req: any): Promise<{
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
    updateSettings(req: any, body: any): Promise<{
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
