import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
