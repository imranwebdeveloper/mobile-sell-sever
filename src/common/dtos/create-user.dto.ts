import {
  IsString,
  MinLength,
  IsEmail,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { Role } from '../constants/user-role.enum';
export class CreateUserDto {
  @MinLength(4)
  @MaxLength(18)
  @IsString()
  firstName: string;
  @MinLength(4)
  @MaxLength(18)
  @IsString()
  lastName: string;
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  @MinLength(8)
  @MaxLength(18)
  password: string;
  roles: string;
}
