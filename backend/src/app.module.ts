import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PrismaModule } from './prisma/prisma.module';
import { FocusModule } from './focus/focus.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { WorkModule } from './work/work.module';
import { GithubModule } from './github/github.module';

@Module({
  imports: [
    CommonModule,
    ThrottlerModule.forRoot([{
      ttl: 60000, // 60 seconds
      limit: 20,  // max 20 requests per ttl
    }]),
    PrismaModule,
    AnalyticsModule,
    FocusModule,
    SettingsModule,
    AuthModule,
    AdminModule,
    WorkModule,
    GithubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
