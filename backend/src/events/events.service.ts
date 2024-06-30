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
import { Invite } from 'schemas/invite.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Invite.name) private inviteModel: Model<Invite>,
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
    try {
      const event = await this.eventModel.findById(id);
      if (event.creator.toString() !== token.sub) {
        throw new UnauthorizedException();
      }

      return this.processDates(id, event);
      
    } catch {
      throw new NotFoundException();
    }
  }

  async settleDate(id:string, settleEventDto: SettleEventDto, token) {
    try {
      const event = await this.eventModel.findById(id);
      if (event.creator.toString() !== token.sub) {
        throw new UnauthorizedException();
      }

      return this.eventModel.findByIdAndUpdate(id, {
        eventDate: settleEventDto.eventDate,
        status: EventStatus.EVENT_CLOSED
      }, {returnDocument: 'after'}).exec()

    } catch {
      throw new NotFoundException();
    }
  }

  async processDates(id: string, event: Event) {
    const from = event.beginDate;
    const to = event.endDate;
    const totalDays = (to.getTime() - from.getTime())/24/60/60/1000;
    let result = [];
    let date = from;
    for (let i = 0; i <= totalDays; i++) {
      result.push({
        'date': date.toISOString().slice(0,10),
        'available': [],
      })
      date.setDate(date.getDate() + 1);
    }
    
    const invites = await this.inviteModel.find({
      event: id,
      responded: true,
    }).exec()
    
    for (let i in invites) {
      for (let j in invites[i].availableDays) {
        let idx = result.findIndex(x => x.date == invites[i].availableDays[j]);
        result[idx].available.push(invites[i].user.toString())
      }
    }
    return result;
  }
}
