import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { EpisodeService } from '../services/episode.service';
import { Response } from 'express';

@Controller('/episodes')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getEpisodes(
    @Res() res: Response,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ): Promise<Response> {
    const episode = await this.episodeService.getEpisodes({ page, limit });
    if (!episode.success) {
      return res.status(400).json({ message: episode.message });
    }
    return res
      .status(200)
      .json({ message: episode.message, data: episode.data });
  }
}
