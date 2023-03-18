import {
  Controller,
  Get,
  Body,
  Post,
  Res,
  Req,
  Param,
  NotFoundException,
  Patch,
  ValidationPipe,
  UsePipes,
  Put,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { MobileDto } from './dto/mobile.dto';
import { VariantDto, VariantUpdateDto } from './dto/variant.dto';
import { MobileService } from './mobile.service';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { parse } from 'path';
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
  /**
   *
   * This is dynamic route for using to provide individual brand mobile devices
   *
   * Route : /mobile/samsung
   *
   */

  // @Get(':brand')
  // async getMobileModel(
  //   @Param() { brand }: { brand: string },
  //   @Res() res: Response,
  // ) {

  //   try {
  //     const models = await this.mobileService.getMobileByBrand(brand);
  //     if (!models) {
  //       throw new NotFoundException(`User with id ${brand} Not found`);
  //     }
  //     return res.json({ status: 200, message: 'success', data: models });
  //   } catch (error) {
  //     return res.status(500).json({ status: 500, message: 'error' });
  //   }
  // }

  /**
   *
   * Route: /mobile/new-mobile
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

  /**
   *
   * this function only provide variants of the mobile document by id
   * Route : mobile/variant/:id
   */

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
    @Req() req: Request,
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
}
