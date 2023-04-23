import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { MobileDto } from '../dtos/create-mobile.dto';
import { VariantUpdateDto } from '../dtos/mobile-variant.dto';
import { MobileService } from '../providers/mobile.service';
import { ResType } from '../interfaces/response-type';
import { UpdateWriteOpResult } from '../interfaces/doc-write-result';
import { Role } from '../constants/user-role.enum';
import { Roles } from '../decorators/roles.decorator';

@Controller('mobiles')
export class MobileController {
  constructor(private readonly mobileService: MobileService) {}

  @Get()
  async getMobiles(): Promise<ResType<any>> {
    const data = await this.mobileService.getMobiles();
    return { message: 'success', data };
  }

  @Get(':id')
  async getMobileById(@Param('id') id: string): Promise<ResType<MobileDto>> {
    const mobile = await this.mobileService.getMobileById(id);
    return { message: 'success', data: mobile };
  }

  @Get('model/:name')
  async getMobileByModelId(
    @Param('name') name: string,
  ): Promise<ResType<MobileDto>> {
    const data = await this.mobileService.getMobileByModelId(name);
    return { message: 'success', data };
  }

  @Get('brand/:name')
  async getMobilesByBrandsName(
    @Param('name') name: string,
  ): Promise<ResType<any>> {
    const data = await this.mobileService.getMobilesByBrandName(name);
    return { message: 'success', data };
  }

  @Roles(Role.admin)
  @Post('new-mobile')
  async addNewMobile(@Body() mobileDto: MobileDto): Promise<ResType<any>> {
    const model_id = `${mobileDto.brandName}-${mobileDto.model
      .split(' ')
      .join('-')}`;
    const data = await this.mobileService.saveNewMobile({
      model_id,
      ...mobileDto,
    });
    return { message: 'success', data };
  }

  @Roles(Role.admin)
  @Put('update-price')
  async updateMobileVariantPrices(
    @Body() body: VariantUpdateDto,
  ): Promise<ResType<UpdateWriteOpResult>> {
    const { id, variants } = body;
    const data =
      await this.mobileService.updateMobileVariantPrices<UpdateWriteOpResult>(
        id,
        variants,
      );
    return { message: 'success', data };
  }

  @Roles(Role.admin)
  @Put('update-content')
  async updateMobileContent(@Body() body: any): Promise<ResType<MobileDto>> {
    const { id, content } = body;
    const data = await this.mobileService.updateMobileContent<MobileDto>(
      id,
      content,
    );

    return { message: 'success', data };
  }

  @Roles(Role.admin)
  @Delete(':id')
  async deleteMobileById(
    @Param('id') id: string,
  ): Promise<ResType<{ id: string }>> {
    const data = await this.mobileService.deleteMobileById(id);
    return { message: 'success', data };
  }
}
