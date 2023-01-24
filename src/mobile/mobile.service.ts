import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mobile, MobileDocument } from './schema/mobile.schema';
import { MobileDto } from './dto/mobile.dto';

@Injectable()
export class MobileService {
  constructor(
    @InjectModel(Mobile.name) private mobileModel: Model<MobileDocument>,
  ) {}

  /**
   * This function create a new mobile document object
   */

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

  async getMobileList(): Promise<any> {
    try {
      const doc = await this.mobileModel.find().select('brandName');
      return doc;
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   *
   * This is function used to query the name of all individual mobile model devices
   *
   * example :  Samsung
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
}
