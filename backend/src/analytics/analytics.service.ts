import { Injectable } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAnalyticsDto: CreateAnalyticsDto) {
    if (!createAnalyticsDto.userId) {
      throw new Error('User ID is required');
    }

    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id: createAnalyticsDto.userId } });
    if (!user) {
      throw new Error('User not found');
    }

    return this.prisma.activitySession.create({
      data: {
        userId: createAnalyticsDto.userId,
        startTime: new Date(createAnalyticsDto.startTime),
        endTime: new Date(createAnalyticsDto.endTime),
        duration: createAnalyticsDto.duration,
        activityScore: createAnalyticsDto.activityScore,
      },
    });
  }

  findAll() {
    return this.prisma.activitySession.findMany({
      include: { user: true },
      orderBy: { startTime: 'desc' }
    });
  }

  findOne(id: string) {
    return this.prisma.activitySession.findUnique({
      where: { id }
    });
  }

  update(id: string, updateAnalyticsDto: UpdateAnalyticsDto) {
    return this.prisma.activitySession.update({
      where: { id },
      data: {
        endTime: updateAnalyticsDto.endTime ? new Date(updateAnalyticsDto.endTime) : undefined,
        duration: updateAnalyticsDto.duration,
        activityScore: updateAnalyticsDto.activityScore,
      },
    });
  }

  remove(id: string) {
    return this.prisma.activitySession.delete({ where: { id } });
  }
}
