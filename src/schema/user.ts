import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/store/enum/user-role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, validateBeforeSave: true })
export class User {
  @Prop({ required: true, max: 18, min: 4, trim: true })
  firstName: string;
  @Prop({ required: true, max: 18, min: 4, trim: true })
  lastName: string;
  @Prop({ required: true, unique: true, trim: true })
  email: string;
  @Prop({ required: true, trim: true })
  password: string;
  @Prop({ type: [String], enum: Role, default: Role.user })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
