import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateInviteDto } from './dto/createInvite.dto';
import { UpdateInviteDto } from './dto/updateInvite.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invite } from 'schemas/invite.schema';

@Injectable()
export class InvitesService {
  constructor(@InjectModel(Invite.name) private inviteModel: Model<Invite>) {}

  async create(createInviteDto: CreateInviteDto) {
    try {
      const alreadyExists = await this.inviteModel
        .find({
          user: createInviteDto.user,
          event: createInviteDto.event,
        })
        .exec();
      if (alreadyExists.length > 0) {
        throw new HttpException('Usuário já convidado para o evento', 400);
      }

      return await new this.inviteModel({
        ...createInviteDto,
        responded: false,
      }).save();
    } catch (err) {
      if (err.status == 400) {
        throw err;
      }
      throw new NotFoundException();
    }
  }

  async findAllPending(token) {
    const invites = await this.inviteModel
      .find({
        user: token.sub,
        responded: false,
      })
      .populate({
        path: 'event',
        populate: {
          path: 'creator',
        },
      })
      .populate('user')
      .exec();
    return invites;
  }

  findOne(id: string, token) {
    try {
      const invite = this.inviteModel.findById(id);
      if (invite[0].user.toString() !== token.sub) {
        throw new UnauthorizedException();
      }
      return invite;
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateInviteDto: UpdateInviteDto, token) {
    try {
      const invite = await this.inviteModel.findById(id).exec();
      if (invite.user.toString() !== token.sub) {
        throw new UnauthorizedException();
      }
      invite.availableDays = updateInviteDto.availableDays;
      invite.responded = true;
      return await this.inviteModel.findByIdAndUpdate(id, invite, {
        returnDocument: 'after',
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async remove(id: string, token) {
    try {
      const invite = await this.inviteModel.findById(id).exec();
      if (invite.user.toString() !== token.sub) {
        throw new UnauthorizedException();
      }

      return await this.inviteModel.findByIdAndDelete(id, {
        returnDocument: 'after',
      });
    } catch {
      throw new NotFoundException();
    }
  }
}
