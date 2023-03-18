import { Model, Types } from 'mongoose';
import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mobile, MobileDocument } from '../schema/mobile';
import { MobileDto } from './dto/mobile.dto';
import { VariantDto } from './dto/variant.dto';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class MobileService {
  constructor(
    @InjectModel(Mobile.name) private mobileModel: Model<MobileDocument>,
    private utilsService: UtilsService,
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
  async getMobileByBrand(brand: string): Promise<any> {
    const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);

    try {
      const doc = await this.mobileModel.find({ brandName });
      return doc;
    } catch (error) {
      console.log(error.message);
    }
  }

  async findMobileById(_id: string): Promise<any> {
    try {
      const id = this.utilsService.verifyId(_id);
      const document = await this.mobileModel.findById({ _id: id });
      if (!document) throw new NotFoundException('Mobile not found');
      return document;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Updates the prices of the variants for a mobile device with the specified ID.
   * @param id The ID of the mobile device to update.
   * @param variantNewPrice The array of new prices for the mobile device variants.
   * @returns A Promise that resolves to the result of the update operation.
   * @throws BadRequestException if an error occurs during the update operation.
   */

  async updateMobileVariantPrices<T>(
    id: string,
    variantNewPrice: VariantDto[],
  ): Promise<T> {
    try {
      const updatedOptions = await this.mobileModel.updateOne(
        { _id: id },
        { $set: { variant: variantNewPrice } },
      );
      return updatedOptions as T;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
