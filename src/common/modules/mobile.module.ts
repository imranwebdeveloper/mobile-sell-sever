import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MobileController } from '../controllers/mobile.controller';
import { MobileService } from '../providers/mobile.service';
import { MobileSchema, Mobile, Phone, PhoneSchema } from '../schema/mobile';
import { UtilsModule } from './utils.module';

@Module({
  imports: [
    UtilsModule,
    MongooseModule.forFeature([{ name: Phone.name, schema: PhoneSchema }]),
  ],
  controllers: [MobileController],
  providers: [MobileService],
})
export class MobileModule {}
