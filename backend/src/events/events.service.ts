import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { Event } from 'schemas/event.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto, user) {
    createEventDto.creator = user.username;
    return await new this.eventModel({
      ...createEventDto,
    }).save();

  }

  findAll(user) {
    return this.eventModel.find();
  }

  findOne(id: number, user) {
    const event = this.eventModel.findById(id);
    // check if user should have access to this event
    return event;
  }

  update(id: number, updateEventDto: UpdateEventDto, user) {
    return `This action updates a #${id} event`;
  }

  remove(id: number, user) {
    return `This action removes a #${id} event`;
  }
}
