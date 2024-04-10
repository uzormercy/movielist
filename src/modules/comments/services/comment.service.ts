import { Injectable, Logger } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { ResponseService } from 'src/shared/utils/respond.service';
import { IResponseData } from 'src/shared/utils/interfaces';
import { IComment } from '../interfaces/comment.interface';
import { EpisodeRepository } from '../../episodes/repositories/episode.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly logger: Logger,
    private readonly response: ResponseService,
    private readonly episodeRepository: EpisodeRepository,
  ) {
    this.logger.log(CommentService.name);
  }

  async getComments(): Promise<IResponseData<IComment[]>> {
    this.logger.log('Request to retrieve comments');
    const comments = await this.commentRepository.getComments();
    if (!comments) {
      this.logger.error('Unable to retrieve comments', { comments });
      return this.response.returnResult({
        success: false,
        message: 'Unable to retrieve comments',
      });
    }
    this.logger.log('Comments retrieved successfully');
    return this.response.returnResult({
      success: true,
      message: 'Comments retrieved successfully',
      data: comments,
    });
  }

  async create(createCommentDTO) {
    const episode = await this.episodeRepository.getEpisodeById(
      createCommentDTO.episodeId,
    );
    if (!episode) {
      this.logger.error('Unable to retrieve episode to make this comment', {
        createCommentDTO,
        episode,
      });
      return this.response.returnResult({
        success: false,
        message: 'Unable to add your comment please try again later',
      });
    }

    const comment = this.commentRepository.create(createCommentDTO);
    if (!comment) {
      this.logger.error('Unable to create comment', { comment });
      return this.response.returnResult({
        success: false,
        message: 'Unable to add your comment please try again later',
      });
    }

    return this.response.returnResult({
      success: true,
      message: 'Comment added successfully',
      data: comment,
    });
  }
}
