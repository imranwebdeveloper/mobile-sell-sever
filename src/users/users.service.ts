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
  async register(createUserDto: CreateUserDto): Promise<any> {
    try {
      const hash = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hash;
      const user = new this.userModel(createUserDto);
      await user.save();
      const { email, _id, role, password, ...rest } = user.toObject();
      const token = await this.authService.generateToken({ email, _id, role });
      return { token, user: { _id, email, role, ...rest } };
    } catch (error) {
      throw new BadRequestException({ validatorError: error.message });
    }
  }

  async login(user: LoginUserDto): Promise<any> {
    try {
      const model = await this.userModel.findOne({ email: user.email });
      if (!model) {
        throw new UnauthorizedException();
      }
      const isMatch = await bcrypt.compare(user.password, model.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid Credentials');
      }
      const { email, _id, role, password, ...rest } = model.toObject();
      const token = await this.authService.generateToken({ email, _id, role });
      return { token, user: { _id, email, role, ...rest } };
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
