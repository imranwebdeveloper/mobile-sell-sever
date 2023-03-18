import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MobileController } from './mobile.controller';
import { MobileService } from './mobile.service';
import { MobileSchema, Mobile } from '../schema/mobile';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [
    UtilsModule,
    MongooseModule.forFeature([{ name: Mobile.name, schema: MobileSchema }]),
  ],
  controllers: [MobileController],
  providers: [MobileService],
})
export class MobileModule {}
