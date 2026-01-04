import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsGateway } from './analytics.gateway';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsGateway],
})
export class AnalyticsModule {}
