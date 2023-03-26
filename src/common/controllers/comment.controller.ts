import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { Role } from '../constants/user-role.enum';
import { CommentService } from '../providers/comment.service';
import { CommentDto } from '../dtos/create-comment.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post(':id')
  @Roles(Role.user)
  async createComment(
    @Param('id') id: string,
    @Req() req: any,
    @Body() comment: CommentDto,
  ): Promise<any> {
    const { _id, firstName, lastName, email } = req.user;
    const data = await this.commentService.createComment({
      ...comment,
      model_id: id,
      user_id: _id,
      firstName,
      lastName,
      email,
    });
    return { status: 'success', data: { comment: data.comment } };
  }
}
