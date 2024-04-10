import { Injectable } from '@nestjs/common';
import { Comment } from '../entities/comment.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(Comment)
    private commentEntity: typeof Comment,
  ) {}
  async getComments(): Promise<Comment[]> {
    return await this.commentEntity.findAll({
      order: [['createdAt', 'DESC']],
    });
  }
  async create(createCommentDto) {
    return await this.commentEntity.create(createCommentDto);
  }
}
