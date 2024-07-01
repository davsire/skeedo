import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type PasswordDocument = HydratedDocument<Password>;

@Schema()
export class Password {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop({ required: true })
  hash: string;
}

export const PasswordSchema = SchemaFactory.createForClass(Password);
