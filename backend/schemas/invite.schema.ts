import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Event } from './event.schema';
import { User } from './user.schema';

export type InviteDocument = HydratedDocument<Invite>;

@Schema()
export class Invite {
  @Prop({
    required: true, 
    type: mongoose.Schema.Types.ObjectId, ref: 'Event',
  })
  event: Event;

  @Prop({
    required: true, 
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  })
  user: User;

  @Prop()
  availableDays: Date[];

  @Prop()
  responded: boolean;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
