import { VariantDto } from './mobile-variant.dto';
import { IsString, MinLength } from 'class-validator';

export class MobileDto {
  @IsString({ message: 'Category must be required' })
  @MinLength(2)
  category: string;
  @MinLength(2)
  @IsString({ message: 'Brand Name must be required' })
  brandName: string;
  @IsString({ message: 'Model Name must be required' })
  @MinLength(2)
  model: string;
  @MinLength(2)
  @IsString({ message: 'Release date Name must be required' })
  releasedDate: string;
  networkBrands: string;
  simType: string;
  dimension: string;
  weight: string;
  build: string;
  screenSize: string;
  screenType: string;
  resolution: string;
  protection: string;
  os: string;
  fingerprint: string;
  sdCard: string;
  variant: VariantDto[];
  romOption: string;
  ramOption: string;
  processor: string;
  cpu: string;
  gpu: string;
  port: string;
  audioJack: string;
  sound: string;
  color: string;
  battery: string;
  charging: [];
  mainCamera: [];
  mainFeatures: string;
  fontCamera: [];
  frontFeatures: string;
  wifi: string;
  bluetooth: string;
  gps: string;
  otg: string;
  fm: string;
  nfc: string;
  sensor: string;
  others: [];
  inTheBox: [];
  imgUrl: string;
  model_id: string;
}
