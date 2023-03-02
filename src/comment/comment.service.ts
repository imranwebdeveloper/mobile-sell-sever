import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../schema/user';
import { Comment, CommentDocument } from '../schema/comment';
import { Mobile, MobileDocument } from '../schema/mobile';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Mobile.name) private mobileModel: Model<MobileDocument>,
  ) {}

  async createComment(comment: any) {
    try {
      const { firstName, lastName, _id } = await this.userModel.findOne({
        _id: comment.user_id,
      });

      if (!_id) throw new UnauthorizedException();

      const isMobileModel = await this.mobileModel.findOne({
        _id: comment.model_id,
      });

      if (!isMobileModel) throw new BadRequestException();

      const userComment = new this.commentModel({
        ...comment,
        firstName,
        lastName,
      });

      return await userComment.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }
}
