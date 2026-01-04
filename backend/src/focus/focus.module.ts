import { Module } from '@nestjs/common';
import { FocusService } from './focus.service';
import { FocusController } from './focus.controller';

@Module({
  controllers: [FocusController],
  providers: [FocusService],
})
export class FocusModule {}
