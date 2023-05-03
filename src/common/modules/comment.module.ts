import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from '../schema/comment';
import { CommentController } from '../controllers/comment.controller';
import { CommentService } from '../providers/comment.service';
import { User, UserSchema } from '../schema/user';
import { Mobile, MobileSchema } from '../schema/mobile';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: User.name, schema: UserSchema },
      { name: Mobile.name, schema: MobileSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
