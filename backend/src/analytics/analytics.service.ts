import { Injectable } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAnalyticsDto: CreateAnalyticsDto) {
    // Ensure user exists or create a temp one if not provided (logic can be refined)
    // For now, we assume userId is provided or we create a default user if needed

    // Check if user exists, if not create a default one for "guest" mode or throw
    // This part depends on if we have auth. Let's assume we ensure a user exists.

    let user = await this.prisma.user.findUnique({ where: { id: createAnalyticsDto.userId } });
    if (!user) {
      // Create a default user if valid UUID or handle error. 
      // For simplicity in this phase, we might auto-create if ID is not found but valid?
      // Actually, let's just create the session and let Prisma throw if FK fails, or better:
      // upsert user if we want lazy user creation.

      // BETTER: Create session connecting to user.
      // If userId is missing, maybe create a temporary user?

      if (!createAnalyticsDto.userId) {
        throw new Error('User ID is required');
      }
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

  update(id: number, updateAnalyticsDto: UpdateAnalyticsDto) {
    return `This action updates a #${id} analytics`;
  }

  remove(id: number) {
    return `This action removes a #${id} analytics`;
  }
}
