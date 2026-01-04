import { FocusService } from './focus.service';
import { CreateFocusDto } from './dto/create-focus.dto';
import { UpdateFocusDto } from './dto/update-focus.dto';
export declare class FocusController {
    private readonly focusService;
    constructor(focusService: FocusService);
    create(createFocusDto: CreateFocusDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFocusDto: UpdateFocusDto): string;
    remove(id: string): string;
}
