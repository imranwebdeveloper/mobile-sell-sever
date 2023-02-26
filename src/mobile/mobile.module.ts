import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MobileController } from './mobile.controller';
import { MobileService } from './mobile.service';
import { MobileSchema, Mobile } from '../schema/mobile';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mobile.name, schema: MobileSchema }]),
  ],
  controllers: [MobileController],
  providers: [MobileService],
})
export class MobileModule {}
