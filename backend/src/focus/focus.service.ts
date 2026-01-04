import { Injectable } from '@nestjs/common';
import { CreateFocusDto } from './dto/create-focus.dto';
import { UpdateFocusDto } from './dto/update-focus.dto';

@Injectable()
export class FocusService {
  create(createFocusDto: CreateFocusDto) {
    return 'This action adds a new focus';
  }

  findAll() {
    return `This action returns all focus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} focus`;
  }

  update(id: number, updateFocusDto: UpdateFocusDto) {
    return `This action updates a #${id} focus`;
  }

  remove(id: number) {
    return `This action removes a #${id} focus`;
  }
}
