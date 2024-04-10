import { Injectable, Logger } from '@nestjs/common';
import { EpisodeRepository } from '../repositories/episode.repository';
import { ResponseService } from 'src/shared/utils/respond.service';
import { IResponseData } from 'src/shared/utils/interfaces';

@Injectable()
export class EpisodeService {
  constructor(
    private readonly episodeRepository: EpisodeRepository,
    private readonly logger: Logger,

    private readonly response: ResponseService,
  ) {
    this.logger.log(EpisodeService.name);
  }

  async getEpisodes(): Promise<IResponseData> {
    this.logger.log('Request to get episodes');
    const episodes = await this.episodeRepository.getEpisodesWithComments();
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

  async characterEpisodes(characterId: string) {
    this.logger.log('Request to get character episodes');
    const episode =
      await this.episodeRepository.getEpisodesByCharacter(characterId);
    if (!episode) {
      this.logger.error('Unable to retrieve character episodes', { episode });
      return this.response.returnResult({
        success: false,
        message: 'Unable to retrieve character episodes',
      });
    }
    this.logger.log('Retrieved character episodes successfully');
    return this.response.returnResult({
      success: true,
      message: 'Character Episodes retrieved successfully',
      data: episode,
    });
  }
}
