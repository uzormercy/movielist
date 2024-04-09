import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentRepository extends Repository<Comment> {}
