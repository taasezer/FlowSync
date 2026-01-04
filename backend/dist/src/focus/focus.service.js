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
exports.FocusService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FocusService = class FocusService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createFocusDto) {
        return this.prisma.focusSession.create({
            data: {
                userId: createFocusDto.userId,
                startTime: new Date(createFocusDto.startTime),
                endTime: createFocusDto.endTime ? new Date(createFocusDto.endTime) : null,
                mode: createFocusDto.mode,
                duration: createFocusDto.duration,
            },
        });
    }
    findAll() {
        return this.prisma.focusSession.findMany();
    }
    findOne(id) {
        return this.prisma.focusSession.findUnique({ where: { id } });
    }
    update(id, updateFocusDto) {
        return this.prisma.focusSession.update({
            where: { id },
            data: updateFocusDto,
        });
    }
    remove(id) {
        return this.prisma.focusSession.delete({ where: { id } });
    }
};
exports.FocusService = FocusService;
exports.FocusService = FocusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FocusService);
//# sourceMappingURL=focus.service.js.map