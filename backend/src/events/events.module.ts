import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'schemas/event.schema';
import { InvitesModule } from 'src/invites/invites.module';
import { Invite, InviteSchema } from 'schemas/invite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
    InvitesModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
