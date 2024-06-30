import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite, InviteSchema } from 'schemas/invite.schema';
import { User, UserSchema } from 'schemas/user.schema';
import { Event, EventSchema } from 'schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [InvitesController],
  providers: [InvitesService],
})
export class InvitesModule {}
