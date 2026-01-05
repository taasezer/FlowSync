import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { GithubModule } from '../github/github.module';

@Module({
  imports: [PrismaModule, GithubModule],
  controllers: [AdminController],
})
export class AdminModule { }
