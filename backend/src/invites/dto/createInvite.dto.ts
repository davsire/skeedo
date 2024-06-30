import { IsBoolean, IsNotEmpty } from "class-validator";

export class CreateInviteDto {
    @IsNotEmpty()
    event: string;

    @IsNotEmpty()
    user: string;

    @IsNotEmpty()
    @IsBoolean()
    responded: boolean;
}
