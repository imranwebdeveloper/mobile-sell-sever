import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AxiosService } from '../providers/axios.service';

@Module({
  providers: [HttpModule],
  exports: [AxiosService],
})
export class AxiosModule {}
