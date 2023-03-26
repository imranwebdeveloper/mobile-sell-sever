import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/common/schema/user';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
// import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from '../dtos/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, // private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new this.userModel(createUserDto);
      return await user.save();
    } catch (error) {
      throw new BadRequestException({ validatorError: error.message });
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
      return user.toObject();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async findUserById(_id: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ _id });
      if (!user) {
        throw new UnauthorizedException('invalid credentials');
      }
      return user.toObject();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
