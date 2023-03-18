import { IsString, IsNumber, IsArray } from 'class-validator';

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

export class VariantUpdateDto {
  @IsArray()
  variants: VariantDto[];
  @IsString()
  id: string;
}
