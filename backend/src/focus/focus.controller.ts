import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FocusService } from './focus.service';
import { CreateFocusDto } from './dto/create-focus.dto';
import { UpdateFocusDto } from './dto/update-focus.dto';

@Controller('focus')
export class FocusController {
  constructor(private readonly focusService: FocusService) {}

  @Post()
  create(@Body() createFocusDto: CreateFocusDto) {
    return this.focusService.create(createFocusDto);
  }

  @Get()
  findAll() {
    return this.focusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.focusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFocusDto: UpdateFocusDto) {
    return this.focusService.update(+id, updateFocusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.focusService.remove(+id);
  }
}
