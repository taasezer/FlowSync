"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const common_module_1 = require("./common/common.module");
const analytics_module_1 = require("./analytics/analytics.module");
const prisma_module_1 = require("./prisma/prisma.module");
const focus_module_1 = require("./focus/focus.module");
const settings_module_1 = require("./settings/settings.module");
const auth_module_1 = require("./auth/auth.module");
const admin_module_1 = require("./admin/admin.module");
const work_module_1 = require("./work/work.module");
const github_module_1 = require("./github/github.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_module_1.CommonModule,
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 20,
                }]),
            prisma_module_1.PrismaModule,
            analytics_module_1.AnalyticsModule,
            focus_module_1.FocusModule,
            settings_module_1.SettingsModule,
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            work_module_1.WorkModule,
            github_module_1.GithubModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map