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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CommentDto, CommentResponseDto } from '../interfaces/comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get comments endpoint',
    description: 'Get all comments',
    tags: ['Comments'],
  })
  @ApiOkResponse({
    type: CommentResponseDto,
    status: 200,
    description: 'Comments retrieved successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to retrieve comments',
  })
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
  @ApiBody({
    type: CommentDto,
  })
  @ApiOperation({
    summary: 'Create comments endpoint',
    description: 'Create comment',
    tags: ['Comments'],
    requestBody: {
      content: {
        'application/json': {
          example: { comment: 'Great movie', ipAddressLocation: '127.0.0.1' },
        },
      },
    },
  })
  @ApiOkResponse({
    type: CommentResponseDto,
    status: 201,
    description: 'Created comment successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to create comment',
  })
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
