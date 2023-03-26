import { IsString, MinLength, IsEmail, MaxLength } from 'class-validator';
export class LoginUserDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  @MinLength(8)
  @MaxLength(18)
  password: string;
}
