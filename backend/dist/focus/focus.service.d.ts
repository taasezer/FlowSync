import { CreateFocusDto } from './dto/create-focus.dto';
import { UpdateFocusDto } from './dto/update-focus.dto';
export declare class FocusService {
    create(createFocusDto: CreateFocusDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFocusDto: UpdateFocusDto): string;
    remove(id: number): string;
}
