import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  displayName: string;

  @Prop()
  passwordHash: string;

  @Prop()
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);