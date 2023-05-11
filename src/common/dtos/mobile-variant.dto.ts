import { IsString, IsNumber, IsArray } from 'class-validator';

export class VariantDto {
  @IsNumber()
  rom: number;

  @IsNumber()
  ram: number;

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
