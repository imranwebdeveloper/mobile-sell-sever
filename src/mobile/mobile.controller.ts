import { Controller, Get, Body, Post, Res, Req } from '@nestjs/common';
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
   * It returns a list of mobile list
   *
   */

  @Get('list')
  async getMobileList(@Res() response: Response) {
    try {
      const data = await this.mobileService.getMobileList();
      return response.json({ status: 200, message: 'success', data });
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   *
   * Route: /mobile/new-mobile
   *
   * This function is created a new Mobile document
   *
   */
  @Post('new-mobile')
  async addNewMobile(@Res() response: Response, @Body() mobileDto: MobileDto) {
    try {
      const data = await this.mobileService.saveNewMobile(mobileDto);
      return response.json({ status: 200, message: 'success', data });
    } catch (error) {
      console.log(error.message);
    }
  }
}
