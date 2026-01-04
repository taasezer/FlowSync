"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFocusDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_focus_dto_1 = require("./create-focus.dto");
class UpdateFocusDto extends (0, mapped_types_1.PartialType)(create_focus_dto_1.CreateFocusDto) {
}
exports.UpdateFocusDto = UpdateFocusDto;
//# sourceMappingURL=update-focus.dto.js.map