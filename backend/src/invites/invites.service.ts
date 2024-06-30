import { Injectable } from '@nestjs/common';
import { CreateInviteDto } from './dto/createInvite.dto';
import { UpdateInviteDto } from './dto/updateInvite.dto';

@Injectable()
export class InvitesService {
  create(createInviteDto: CreateInviteDto, token) {
    return 'This action adds a new invite';
  }

  findAll(token) {
    return `This action returns all invites`;
  }

  findOne(id: string, token) {
    return `This action returns a #${id} invite`;
  }

  update(id: string, updateInviteDto: UpdateInviteDto, token) {
    return `This action updates a #${id} invite`;
  }

  remove(id: string, token) {
    return `This action removes a #${id} invite`;
  }
}
