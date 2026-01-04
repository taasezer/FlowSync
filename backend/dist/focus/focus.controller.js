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
exports.FocusController = void 0;
const common_1 = require("@nestjs/common");
const focus_service_1 = require("./focus.service");
const create_focus_dto_1 = require("./dto/create-focus.dto");
const update_focus_dto_1 = require("./dto/update-focus.dto");
let FocusController = class FocusController {
    focusService;
    constructor(focusService) {
        this.focusService = focusService;
    }
    create(createFocusDto) {
        return this.focusService.create(createFocusDto);
    }
    findAll() {
        return this.focusService.findAll();
    }
    findOne(id) {
        return this.focusService.findOne(+id);
    }
    update(id, updateFocusDto) {
        return this.focusService.update(+id, updateFocusDto);
    }
    remove(id) {
        return this.focusService.remove(+id);
    }
};
exports.FocusController = FocusController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_focus_dto_1.CreateFocusDto]),
    __metadata("design:returntype", void 0)
], FocusController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FocusController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FocusController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_focus_dto_1.UpdateFocusDto]),
    __metadata("design:returntype", void 0)
], FocusController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FocusController.prototype, "remove", null);
exports.FocusController = FocusController = __decorate([
    (0, common_1.Controller)('focus'),
    __metadata("design:paramtypes", [focus_service_1.FocusService])
], FocusController);
//# sourceMappingURL=focus.controller.js.map