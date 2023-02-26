import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      const hash = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hash;
      const token = await this.authService.generateToken({
        email: createUserDto.email,
      });
      const model = new this.userModel(createUserDto);
      await model.save();
      return token;
    } catch (error) {
      throw new BadRequestException({ validatorError: error.message });
    }
  }

  async login(user: LoginUserDto): Promise<string> {
    try {
      const model = await this.userModel.findOne({ email: user.email });
      const match = await bcrypt.compare(user.password, model.password);
      if (!model || !match) {
        throw new UnauthorizedException();
      }
      const token = await this.authService.generateToken({
        email: model.email,
      });
      return token;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
