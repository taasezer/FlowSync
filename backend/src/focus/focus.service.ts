import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFocusDto } from './dto/create-focus.dto';
import { UpdateFocusDto } from './dto/update-focus.dto';

@Injectable()
export class FocusService {
  constructor(private readonly prisma: PrismaService) { }

  create(createFocusDto: CreateFocusDto) {
    return this.prisma.focusSession.create({
      data: {
        userId: createFocusDto.userId,
        startTime: new Date(createFocusDto.startTime),
        endTime: createFocusDto.endTime ? new Date(createFocusDto.endTime) : null,
        mode: createFocusDto.mode,
        duration: createFocusDto.duration,
      },
    });
  }

  findAll() {
    return this.prisma.focusSession.findMany();
  }

  findOne(id: string) {
    return this.prisma.focusSession.findUnique({ where: { id } });
  }

  update(id: string, updateFocusDto: UpdateFocusDto) {
    return this.prisma.focusSession.update({
      where: { id },
      data: updateFocusDto,
    });
  }

  remove(id: string) {
    return this.prisma.focusSession.delete({ where: { id } });
  }
}
