import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidationPipe } from '../pipes/user-validation.pipe';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body(new UserValidationPipe()) createUserDto: CreateUserDto) {
    const token = await this.usersService.create(createUserDto);
    return { status: 'success', token };
  }
  @Post('login')
  async login(
    @Body(new UserValidationPipe()) loginUserDto: LoginUserDto,
  ): Promise<any> {
    const token = await this.usersService.login(loginUserDto);
    return { status: 'success', token };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
