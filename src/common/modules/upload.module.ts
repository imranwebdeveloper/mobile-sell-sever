import { Module } from '@nestjs/common';
import { UploadController } from '../controllers/upload.controller';
import { UtilsService } from '../providers/utils.service';
import { AxiosModule } from './Axios.module';
import { UploadService } from '../providers/upload.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneSchema, Phone } from '../schema/mobile';

@Module({
  imports: [
    AxiosModule,
    MongooseModule.forFeature([{ name: Phone.name, schema: PhoneSchema }]),
  ],
  controllers: [UploadController],
  providers: [UtilsService, UploadService],
})
export class UploadModule {}
