import { Module } from '@nestjs/common';
import { CommentRepository } from './repositories/comment.repository';

@Module({
  providers: [CommentRepository],
})
export class CommentModule {}
