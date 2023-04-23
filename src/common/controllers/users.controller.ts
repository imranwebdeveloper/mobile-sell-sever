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
import { UsersService } from '../providers/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AuthService } from '../providers/auth.service';
import { LocalAuthGuard } from '../guards/auth.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    const data = await this.authService.register(createUserDto);
    return { status: 'success', data };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: any): Promise<any> {
    const data = await this.authService.login(req.user);
    console.log(data);
    return { status: 'success', data };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@Req() req: any): Promise<any> {
    const { user } = await this.authService.login(req.user);
    return { status: 'success', data: user };
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
