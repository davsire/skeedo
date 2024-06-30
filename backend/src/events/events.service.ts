import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Event, EventStatus } from 'schemas/event.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvitesService } from 'src/invites/invites.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { SettleEventDto } from './dto/settleEvent.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private readonly invitesService: InvitesService,
  ) {}

  async create(createEventDto: CreateEventDto, user) {
    const event = await new this.eventModel({
      ...createEventDto,
      creator: user.sub,
      status: EventStatus.WAITING_RESPONSES,
    }).save();

    for (const user of event.participants) {
      this.invitesService.create({
        event: event,
        user: user,
      });
    }

    return event;
  }

  async findAllClosed(token: any) {
    return await this.eventModel
      .find({
        status: EventStatus.EVENT_CLOSED,
        $or: [{ participants: token.sub }, { creator: token.sub }],
      })
      .populate('creator')
      .populate('participants')
      .exec();
  }

  async findAllWaitingResponses(token: any) {
    return await this.eventModel
      .find({
        status: EventStatus.WAITING_RESPONSES,
        creator: token.sub,
      })
      .populate('creator')
      .populate('participants')
      .exec();
  }

  async findOne(id: string, user) {
    try {
      const event = await this.eventModel.findById(id);
      if (event.creator.toString() !== user.sub) {
        throw new UnauthorizedException();
      }
      return event;
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto, user) {
    try {
      const event = await this.eventModel.findById(id);
      if (event.creator.toString() !== user.sub) {
        throw new UnauthorizedException();
      }

      return await this.eventModel.findByIdAndUpdate(
        id,
        { name: updateEventDto.name },
        { returnDocument: 'after' },
      );
    } catch {
      throw new NotFoundException();
    }
  }

  async remove(id: string, token) {
    try {
      const event = await this.eventModel.findById(id);
      if (event.creator.toString() !== token.sub) {
        throw new UnauthorizedException();
      }

      return await this.eventModel.findByIdAndDelete(id);
    } catch {
      throw new NotFoundException();
    }
  }

  async dateOptions(id: string, token) {

  }

  async settleDate(id:string, settleEventDto: SettleEventDto, token) {

  }
}
