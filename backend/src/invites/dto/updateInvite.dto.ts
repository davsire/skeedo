import { PartialType } from '@nestjs/mapped-types';
import { CreateInviteDto } from './createInvite.dto';

export class UpdateInviteDto extends PartialType(CreateInviteDto) {}
