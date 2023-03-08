import { Model } from 'mongoose';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mobile, MobileDocument } from '../schema/mobile';
import { MobileDto } from './dto/mobile.dto';

@Injectable()
export class MobileService {
  constructor(
    @InjectModel(Mobile.name) private mobileModel: Model<MobileDocument>,
  ) {}

  async getAllMobileList() {
    try {
      const doc = await this.mobileModel
        .find()
        .select(['brandName', 'model', 'imgUrl', 'variant', 'updatedAt']);
      if (!doc) throw new NotFoundException('No Mobile List found');
      return doc;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async saveNewMobile(mobile: MobileDto): Promise<Mobile> {
    try {
      const res = new this.mobileModel(mobile);
      return await res.save();
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * This function give all mobile list items
   *
   * Example:
   *
   * Apple, Samsung,
   *
   */

  /**
   *
   * This is function used to get all individual mobile model devices
   *
   * example :  Samsung all devices
   */

  async getMobileByBrand(brand: string): Promise<any> {
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);

    try {
      const doc = await this.mobileModel.find({ brandName });
      return doc;
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   *
   * this function only provide variants of the mobile document by id
   * @param {string} _id
   * @returns :  [{ram:12, rom:64, offical:25000, unofficial:22000}]
   */

  async findVariantById(_id: string) {
    try {
      return await this.mobileModel.findById({ _id });
    } catch (error) {
      throw new HttpException(
        `Document with id ${_id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateValue<T>(id: string, field: string, newValue: T): Promise<any> {
    try {
      return this.mobileModel.updateOne(
        { _id: id },
        { $set: { [field]: newValue } },
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}
