import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidationPipe } from '../pipes/user-validation.pipe';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body(new UserValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<any> {
    const data = await this.usersService.register(createUserDto);
    return { status: 'success', data };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(new UserValidationPipe()) loginUserDto: LoginUserDto,
  ): Promise<any> {
    const data = await this.usersService.login(loginUserDto);
    return { status: 'success', data };
  }

  // <<<<<<<<<<<<<<<< Public comments service >>>>>>>>>>>>>>>>>>>>>>>

  @UseGuards(JwtAuthGuard)
  @Post('comment')
  async createComment(@Param('id') id: string, @Req() req): Promise<any> {
    console.log(req.user);
    return 'https';
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
