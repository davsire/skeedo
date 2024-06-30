import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { InvitesModule } from './invites/invites.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/27017'),
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    EventsModule,
    InvitesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
