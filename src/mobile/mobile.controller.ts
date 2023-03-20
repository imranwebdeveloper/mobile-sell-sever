import {
  Controller,
  Get,
  Body,
  Post,
  Res,
  Req,
  Param,
  Put,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MobileDto } from './dto/mobile.dto';
import { VariantUpdateDto } from './dto/variant.dto';
import { MobileService } from './mobile.service';
import { v4 as uuidv4 } from 'uuid';
import { ResType } from '../store/type/response.type';
import { UpdateWriteOpResult } from '../store/type/document-write-result.type';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../store/enum/user-role.enum';

@Controller('mobile')
export class MobileController {
  constructor(private readonly mobileService: MobileService) {}

  @Get('list')
  async getAllMobileList() {
    const data = await this.mobileService.getAllMobileList();
    return { status: 'success', data };
  }

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

  @Get('/:id')
  async getMobileById(
    @Param() { id }: { id: string },
  ): Promise<ResType<MobileDto>> {
    const mobile = await this.mobileService.findMobileById(id);
    return { message: 'success', data: mobile };
  }

  @Roles(Role.admin)
  @Put('update-price')
  async updateMobileVariantPrices(
    @Body() body: VariantUpdateDto,
  ): Promise<ResType<UpdateWriteOpResult>> {
    const { id, variants } = body;
    const updatedOptions =
      await this.mobileService.updateMobileVariantPrices<UpdateWriteOpResult>(
        id,
        variants,
      );
    return { message: 'success', data: updatedOptions };
  }

  @Roles(Role.admin)
  @Put('update-content')
  async updateMobileContent(@Body() body: any): Promise<ResType<MobileDto>> {
    const { id, content } = body;
    const updatedData = await this.mobileService.updateMobileContent<MobileDto>(
      id,
      content,
    );
    return { message: 'success', data: updatedData };
  }
}
