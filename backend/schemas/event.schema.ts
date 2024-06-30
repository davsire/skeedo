import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type EventDocument = HydratedDocument<Event>;
export enum EventStatus {
  WAITING_RESPONSES = 'WAITING_RESPONSES',
  EVENT_CLOSED = 'EVENT_CLOSED',
}


@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true, 
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  })
  creator: User;

  @Prop({ required: true })
  beginDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  eventDate: Date | undefined;

  @Prop({ required: true })
  status: EventStatus;

  @Prop({
    required: true, 
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  participants: User[];

}

export const EventSchema = SchemaFactory.createForClass(Event);