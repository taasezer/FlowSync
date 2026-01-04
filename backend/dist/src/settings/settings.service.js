"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SettingsService = class SettingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSettingDto) {
        if (!createSettingDto.userId) {
            throw new Error('User ID is required');
        }
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
    findOne(id) {
        return this.prisma.userSettings.findUnique({ where: { id } });
    }
    async findByUserId(userId) {
        return this.prisma.userSettings.findUnique({ where: { userId } });
    }
    update(id, updateSettingDto) {
        return this.prisma.userSettings.update({
            where: { id },
            data: updateSettingDto,
        });
    }
    remove(id) {
        return this.prisma.userSettings.delete({ where: { id } });
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SettingsService);
//# sourceMappingURL=settings.service.js.map