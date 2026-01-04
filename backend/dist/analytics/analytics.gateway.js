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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const analytics_service_1 = require("./analytics.service");
const create_analytics_dto_1 = require("./dto/create-analytics.dto");
const update_analytics_dto_1 = require("./dto/update-analytics.dto");
const socket_io_1 = require("socket.io");
let AnalyticsGateway = class AnalyticsGateway {
    analyticsService;
    server;
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
        setInterval(() => {
            const mockLevel = Math.floor(Math.random() * 30) + 60;
            this.server.emit('activity_level', mockLevel);
        }, 5000);
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    create(createAnalyticsDto) {
        return this.analyticsService.create(createAnalyticsDto);
    }
    findAll() {
        return this.analyticsService.findAll();
    }
    findOne(id) {
        return this.analyticsService.findOne(id);
    }
    update(updateAnalyticsDto) {
        return this.analyticsService.update(updateAnalyticsDto.id, updateAnalyticsDto);
    }
    remove(id) {
        return this.analyticsService.remove(id);
    }
};
exports.AnalyticsGateway = AnalyticsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AnalyticsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createAnalytics'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_analytics_dto_1.CreateAnalyticsDto]),
    __metadata("design:returntype", void 0)
], AnalyticsGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllAnalytics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalyticsGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findOneAnalytics'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalyticsGateway.prototype, "findOne", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateAnalytics'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_analytics_dto_1.UpdateAnalyticsDto]),
    __metadata("design:returntype", void 0)
], AnalyticsGateway.prototype, "update", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removeAnalytics'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalyticsGateway.prototype, "remove", null);
exports.AnalyticsGateway = AnalyticsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsGateway);
//# sourceMappingURL=analytics.gateway.js.map