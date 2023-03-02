import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Mobile } from './mobile';
import { User } from './user';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true, validateBeforeSave: true })
export class Comment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mobile',
  })
  model_id: Mobile;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user_id: User;
  @Prop({ required: true, max: 220, min: 10 })
  comment: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
