import { Injectable } from '@nestjs/common';
import { AxiosService } from './axios.service';
import { UtilsService } from './utils.service';
import { Content, MobileContent, Phone, PhoneDocument } from '../schema/mobile';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePhoneDto } from '../dtos/phone.dto';
import { format, parse } from 'date-fns';

@Injectable()
export class UploadService {
  constructor(
    private axiosService: AxiosService,
    private UtilsService: UtilsService,
    @InjectModel(Phone.name) private phoneDocument: Model<PhoneDocument>,
  ) {}

  async saveNewMobileInfo(data: CreatePhoneDto) {
    try {
      const parsedDate = parse(
        data.content['Launch']['announced'],
        'yyyy, MMMM dd',
        new Date(),
      );
      data.releasedDate = new Date(parsedDate);

      if (data.content['Tests']) {
        delete data.content['Tests'];
      }

      const downloadImgBuffer = await this.axiosService.downloadImgFromInternet(
        data.img_url,
      );

      const storeLocation = `${data.brand.toLowerCase()}/${data.model_id}.jpg`;
      const img_url = await this.UtilsService.uploadPhotos(
        downloadImgBuffer,
        storeLocation,
      );
      data.img_url = img_url;

      const doc = new this.phoneDocument(data);
      await doc.save();
      return doc.title;
    } catch (error) {
      console.log(error);
    }
  }
}
