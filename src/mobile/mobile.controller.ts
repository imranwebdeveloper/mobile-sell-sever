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
import { VariantDto } from './dto/variant.dto';
import { MobileService } from './mobile.service';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { parse } from 'path';

@Controller('mobile')
@UsePipes(new ValidationPipe({ transform: true }))
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
   * This is dynamic route for using to provide individual brand mobile devices
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

  @Get('/variant/:id')
  async getMobileVariantById(
    @Res() res: Response,
    @Param() { id }: { id: string },
  ) {
    const variant = await this.mobileService.findVariantById(id);
    return res.json({ status: 200, message: 'success', data: variant });
  }

  /**
   *
   * This request updates mobile price as variations
   *
   */
  @Put('/price/:id')
  async updateMobilePrice(
    @Res() res: Response,
    @Param() { id }: { id: string },
    @Body() variant: VariantDto[],
  ) {
    const doc = await this.mobileService.updateValue(id, 'variant', variant);
    return res.json({ status: 200, message: 'success', data: doc });
  }

  // @Post('test')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './public/img',
  //       filename: (req, file, callback) => {
  //         const fileName =
  //           parse(file.originalname).name.split(' ').join('-') + uuidv4();
  //         const ext = parse(file.originalname).ext;
  //         callback(null, `${fileName}${ext}`);
  //       },
  //     }),
  //   }),
  // )
  // async uploadFile(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Res() res: Response,
  // ) {
  //   console.log(file);
  // }
}
