import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Req() req: any,
    @Body() commentDto: CommentDto,
  ): Promise<any> {
    const data = await this.commentService.createComment({
      ...commentDto,
      model_id: id,
      user_id: req.user._id,
    });
    return { status: 'success', data };
  }
}
