import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalyticsModule } from './analytics/analytics.module';
import { PrismaModule } from './prisma/prisma.module';
import { FocusModule } from './focus/focus.module';

@Module({
  imports: [AnalyticsModule, PrismaModule, FocusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
