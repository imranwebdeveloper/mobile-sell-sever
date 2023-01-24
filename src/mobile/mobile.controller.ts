import {
  Controller,
  Get,
  Body,
  Post,
  Res,
  Req,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MobileDto } from './dto/mobile.dto';
import { MobileService } from './mobile.service';

@Controller('mobile')
export class MobileController {
  constructor(private readonly mobileService: MobileService) {}

  /**
   *
   * Route: /mobile/list
   *
   * It function returns a list of mobile devices
   *
   * example: Apple, Samsung
   */

  @Get('list')
  async getMobileList(@Res() res: Response) {
    try {
      const data = await this.mobileService.getMobileList();
      return res.json({ status: 200, message: 'success', data });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ status: 500, message: 'error' });
    }
  }
  /**
   *
   * This is dynamic route for using to get individual brand mobile devices
   *
   * Route : /mobile/samsung
   *
   */

  @Get(':brand')
  async getMobileModel(
    @Param() { brand }: { brand: string },
    @Res() res: Response,
  ) {
    try {
      const models = await this.mobileService.getMobileByBrand(brand);
      if (!models) {
        throw new NotFoundException(`User with id ${brand} Not found`);
      }
      return res.json({ status: 200, message: 'success', data: models });
    } catch (error) {
      return res.status(500).json({ status: 500, message: 'error' });
    }
  }

  /**
   *
   * Route: /mobile/new-mobile
   *
   * This function is created a new mobile document
   *
   */
  @Post('new-mobile')
  async addNewMobile(@Res() res: Response, @Body() mobileDto: MobileDto) {
    try {
      const data = await this.mobileService.saveNewMobile(mobileDto);
      return res.json({ status: 200, message: 'success', data });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ status: 500, message: 'error' });
    }
  }
}
