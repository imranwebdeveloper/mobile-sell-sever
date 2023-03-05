import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../store/enum/user-role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

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
