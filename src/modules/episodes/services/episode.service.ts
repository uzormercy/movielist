import { Injectable, Logger } from '@nestjs/common';
import { EpisodeRepository } from '../repositories/episode.repository';
import { ResponseService } from 'src/shared/utils/respond.service';
import { IResponseData } from 'src/shared/utils/interfaces';
import { IEpisode, TEpisodeRequest } from '../interfaces/episode.interface';

@Injectable()
export class EpisodeService {
  constructor(
    private readonly episodeRepository: EpisodeRepository,
    private readonly logger: Logger,

    private readonly response: ResponseService,
  ) {
    this.logger.log(EpisodeService.name);
  }

  async getEpisodes(
    episodeRequest: TEpisodeRequest,
  ): Promise<IResponseData<{ count: number; rows: IEpisode[] }>> {
    this.logger.log('Request to get episodes');
    const episodes = await this.episodeRepository.getEpisodesWithComments(
      episodeRequest.page,
      episodeRequest.limit,
    );
    if (!episodes) {
      this.logger.error('Unable to retrieve episodes', { episodes });
      return this.response.returnResult({
        success: false,
        message: 'Unable to retrieve episodes',
      });
    }
    this.logger.log('Retrieved episodes successfully');
    return this.response.returnResult({
      success: true,
      message: 'Episode retrieved successfully',
      data: episodes,
    });
  }
}