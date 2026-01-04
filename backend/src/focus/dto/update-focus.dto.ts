import { PartialType } from '@nestjs/mapped-types';
import { CreateFocusDto } from './create-focus.dto';

export class UpdateFocusDto extends PartialType(CreateFocusDto) {}
