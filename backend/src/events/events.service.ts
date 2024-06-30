import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { Event, EventStatus } from 'schemas/event.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto, user) {
    return await new this.eventModel({
      ...createEventDto,
      creator: user.sub,
      status: EventStatus.WAITING_RESPONSES,
    }).save();
  }

  async findAll(token) {
    //return await this.eventModel.find({creator: user.sub});
    const events = await this.eventModel.find().exec();
    const result = [];
    for (let i = 0; i < events.length; i++) {
      if (
        events[i].participants.map((x) => x.toString()).indexOf(token.sub) >
          -1 ||
        events[i].creator.toString() == token.sub
      ) {
        result.push(events[i]);
      }
    }
    return result;
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

  async remove(id: string, user) {
    try {
      const event = await this.eventModel.findById(id);
      if (event.creator.toString() !== user.sub) {
        throw new UnauthorizedException();
      }

      return await this.eventModel.findByIdAndDelete(id);
    } catch {
      throw new NotFoundException();
    }
  }
}
