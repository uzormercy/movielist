import { ApiProperty } from '@nestjs/swagger';
import { IComment } from './comment.interface';
import { IResponseDto } from 'src/shared/types';

export class CommentResponseDto implements IResponseDto<IComment> {
  @ApiProperty({
    type: String,
    description: 'Message from api',
    example: 'Comment retrieved successfully',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Data from api',
    example: {
      comment: 'Interesting Movie',
      ipAddressLocation: '127.0.0.1',
    },
  })
  data: IComment;
}

export class CreateCommentResponseDto implements IResponseDto<IComment> {
  @ApiProperty({
    type: String,
    description: 'Message from api',
    example: 'Comment retrieved successfully',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Data from api',
    example: {
      comment: 'Interesting Movie',
      ipAddressLocation: '127.0.0.1',
    },
  })
  data: IComment;
}

export class CommentDto implements IComment {
  @ApiProperty({
    type: String,
    description: 'Comment from user',
    example: 'Great movie',
  })
  comment: string;

  @ApiProperty({
    type: String,
    description: 'Ip Address Location from user',
    example: '127.0.0.1',
  })
  ipAddressLocation: string;
}
