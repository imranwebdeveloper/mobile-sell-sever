import { Module } from '@nestjs/common';
import { UploadController } from '../controllers/upload.controller';
import { UtilsService } from '../providers/utils.service';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UtilsService],
})
export class UploadModule {}
