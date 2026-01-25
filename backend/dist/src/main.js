"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const logger_service_1 = require("./common/logger.service");
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    const logger = new logger_service_1.LoggerService();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger });
    app.use((0, helmet_1.default)());
    app.setGlobalPrefix('api');
    app.enableCors({ origin: 'http://localhost:5173', credentials: true });
    await app.useGlobalPipes(new common_1.ValidationPipe());
    const port = process.env.PORT || 3005;
    await app.listen(port);
    logger.log(`Application running on port ${port}`, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map