import {
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { UtilsService } from '../providers/utils.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResType } from '../interfaces/response-type';
import * as CSV from 'csvtojson';
import { CSVMobileFormat } from '../interfaces/CSV';
import { mobileState } from '../schema/mobileModel';
import { MobileDto } from '../dtos/create-mobile.dto';
import { UploadService } from '../providers/upload.service';

@Controller('upload')
export class UploadController {
  constructor(
    private utilsService: UtilsService,
    private uploadService: UploadService,
  ) {}

  @Post('mobile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMobilePhotos(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          //   new MaxFileSizeValidator({ maxSize: 10000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<ResType<{ img_url: string }>> {
    const data = new Date().getTime();
    const photoName = `${data}-${file.originalname}`;
    const img_url = await this.utilsService.uploadPhotos(
      file.buffer,
      photoName,
    );
    return { message: 'success', data: { img_url } };
  }

  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async convertCSVFile(
    @UploadedFile(new ParseFilePipe({}))
    file: Express.Multer.File,
  ): Promise<ResType<MobileDto>> {
    const CSVString = file.buffer.toString('utf-8');
    const content: CSVMobileFormat[] = await CSV().fromString(CSVString);

    const data: any = {};

    content.forEach((item) => {
      if (item.field2 === 'mainCamera' && item.Values.length > 1) {
        if (!data.mainCamera) {
          data.mainCamera = [];
        }
        data.mainCamera.push(item.Values);
      } else if (item.field2 === 'fontCamera' && item.Values.length > 1) {
        if (!data.fontCamera) {
          data.fontCamera = [];
        }
        data.fontCamera.push(item.Values);
      } else if (item.field2 === 'charging' && item.Values.length > 1) {
        if (!data.charging) {
          data.charging = [];
        }
        data.charging.push(item.Values);
      } else if (!data[item.field2] && item.field2.length > 1) {
        data[item.field2] = item.Values;
      }
    });

    return { message: 'success', data: { ...mobileState, ...data } };
  }

  @Post('scraping')
  async saveNewMobileInfo(@Body() body: any) {
    const data = await this.uploadService.saveNewMobileInfo(body);
    return data;
  }
}
