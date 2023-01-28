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
      const variant = await this.mobileModel
        .findById({ _id })
        .select(['variant', 'brandName', 'model', 'imgUrl']);

      return variant;
    } catch (error) {
      console.log(error.message);
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
