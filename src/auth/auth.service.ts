import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from '../schema/user';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    try {
      const hash = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hash;
      const user = await this.userService.create(createUserDto);
      const { firstName, _id, password, ...rest } = user.toObject();
      const { access_token } = await this.login({ firstName, _id });
      return { access_token, user: { _id, firstName, ...rest } };
    } catch (error) {
      throw new BadRequestException({ validatorError: error.message });
    }
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.firstName, _id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(email: string, userPassword: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    const isMatch = await bcrypt.compare(userPassword, user.password);
    if (!isMatch) throw new BadRequestException('Invalid credentials');
    const { password, ...result } = user;
    return result;
  }

  async validateToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const { password, ...user } = await this.userService.findUserById(
        payload._id,
      );
      return user;
    } catch (err) {
      throw new UnauthorizedException('invalid credentials');
    }
  }
}
