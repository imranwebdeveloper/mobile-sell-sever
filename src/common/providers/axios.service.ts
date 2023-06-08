import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AxiosService {
  constructor(private readonly axios: HttpService) {}

  async downloadImgFromInternet(
    url: string,
  ): Promise<Observable<AxiosResponse<Buffer>>> {
    return this.axios.get(url, { responseType: 'arraybuffer' });
  }
}
