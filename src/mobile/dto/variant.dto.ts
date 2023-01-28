import { IsString, IsNumber } from 'class-validator';

export class VariantDto {
  @IsString()
  rom: string;

  @IsString()
  ram: string;

  @IsNumber()
  official: number;

  @IsNumber()
  unofficial: number;
}
