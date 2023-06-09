import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AxiosService {
  constructor(private readonly axios: HttpService) {}

  async downloadImgFromInternet(url: string): Promise<Buffer> {
    const { data } = await this.axios
      .get(url, { responseType: 'arraybuffer' })
      .toPromise();
    return data;
  }
}
