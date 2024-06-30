import { IsArray, IsNotEmpty } from "class-validator";

export class UpdateInviteDto {
    @IsNotEmpty()
    @IsArray()
    availableDays: Date[];
}
