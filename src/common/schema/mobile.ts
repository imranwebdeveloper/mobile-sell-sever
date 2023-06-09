import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export type MobileDocument = HydratedDocument<Mobile>;

@Schema({ timestamps: true })
export class Mobile {
  @Prop({ required: true, min: 2 })
  category: String;
  @Prop({ required: true, min: 2 })
  brandName: String;
  @Prop({ required: true, min: 2 })
  model: String;
  @Prop({ required: true, min: 2 })
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
  @Prop({ required: true })
  variant: [
    {
      rom: String;
      ram: String;
      official: Number;
      unofficial: Number;
    },
  ];
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
  @Prop({ unique: true })
  model_id: String;
  @Prop()
  identifier: String;
  positioning: String;
  @Prop()
  frontVideo: String;
  @Prop()
  mainVideo: String;
}

export const MobileSchema = SchemaFactory.createForClass(Mobile);

export type MobileContent = HydratedDocument<Content>;

@Schema({ timestamps: true })
export class Content {
  @Prop()
  name: String;
}

export const MobileContentSchema = SchemaFactory.createForClass(Content);

export type PhoneDocument = Phone & Document;

@Schema({ timestamps: true })
export class Phone {
  @Prop()
  releasedDate: Date;
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  model_id: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  variants: { ROM: number; RAM: number; price: number }[];

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  approved: boolean;

  @Prop({ required: true })
  img_url: string;

  @Prop({ required: true, type: Object })
  content: {
    [key: string]: any;
  };
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
