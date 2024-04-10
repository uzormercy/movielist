import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { Response } from 'express';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getComments(@Res() res: Response): Promise<Response> {
    const comments = await this.commentService.getComments();
    if (!comments.success) {
      return res.status(400).json({ message: comments.message });
    }
    return res
      .status(200)
      .json({ message: comments.message, data: comments.data });
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: any, @Res() res: Response) {
    const comment = await this.commentService.create(body);
    if (!comment.success) {
      return res.status(400).json({ message: comment.message });
    }
    return res
      .status(200)
      .json({ message: comment.message, data: comment.data });
  }
}
