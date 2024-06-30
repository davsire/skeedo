import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { InvitesModule } from './invites/invites.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/app'),
    AuthModule,
    UsersModule,
    EventsModule,
    InvitesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
