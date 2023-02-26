import {
  IsString,
  MinLength,
  IsEmpty,
  IsEmail,
  MaxLength,
} from 'class-validator';
import { Role } from '../../store/enum/user-role.enum';
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
  @IsString()
  role: Role.public | Role.seller;
}
