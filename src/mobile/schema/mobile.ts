import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MobileDocument = HydratedDocument<Mobile>;

@Schema({ timestamps: true })
export class Mobile {
  //   @Prop()
  //   name: string;
  @Prop()
  brandName: String;
  @Prop()
  model: String;
  @Prop()
  releasedDate: String;
  @Prop()
  networkBrands: String;
  @Prop()
  simType: String;
  @Prop()
  dimension: String;
  @Prop()
  weight: String;
  @Prop()
  build: String;
  @Prop()
  screenSize: String;
  @Prop()
  screenType: String;
  @Prop()
  resolution: String;
  @Prop()
  protection: String;
  @Prop()
  os: String;
  @Prop()
  fingerprint: String;
  @Prop()
  sdCard: String;
  @Prop()
  variant: [];
  @Prop()
  romOption: String;
  @Prop()
  ramOption: String;
  @Prop()
  processor: String;
  @Prop()
  cpu: String;
  @Prop()
  gpu: String;
  @Prop()
  port: String;
  @Prop()
  audioJack: String;
  @Prop()
  sound: String;
  @Prop()
  color: String;
  @Prop()
  battery: String;
  @Prop()
  charging: [];
  @Prop()
  mainCamera: [];
  @Prop()
  mainFeatures: String;
  @Prop()
  fontCamera: [];
  @Prop()
  frontFeatures: String;
  @Prop()
  wifi: String;
  @Prop()
  bluetooth: String;
  @Prop()
  gps: String;
  @Prop()
  otg: String;
  @Prop()
  fm: String;
  @Prop()
  nfc: String;
  @Prop()
  sensor: String;
  @Prop()
  others: [];
  @Prop()
  inTheBox: [];
  @Prop()
  imgUrl: String;
}

export const MobileSchema = SchemaFactory.createForClass(Mobile);
