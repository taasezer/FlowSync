import { FocusService } from './focus.service';
import { CreateFocusDto } from './dto/create-focus.dto';
import { UpdateFocusDto } from './dto/update-focus.dto';
export declare class FocusController {
    private readonly focusService;
    constructor(focusService: FocusService);
    create(createFocusDto: CreateFocusDto): import(".prisma/client").Prisma.Prisma__FocusSessionClient<{
        id: string;
        startTime: Date;
        endTime: Date | null;
        duration: number | null;
        mode: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        startTime: Date;
        endTime: Date | null;
        duration: number | null;
        mode: string;
        userId: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__FocusSessionClient<{
        id: string;
        startTime: Date;
        endTime: Date | null;
        duration: number | null;
        mode: string;
        userId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateFocusDto: UpdateFocusDto): import(".prisma/client").Prisma.Prisma__FocusSessionClient<{
        id: string;
        startTime: Date;
        endTime: Date | null;
        duration: number | null;
        mode: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__FocusSessionClient<{
        id: string;
        startTime: Date;
        endTime: Date | null;
        duration: number | null;
        mode: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
