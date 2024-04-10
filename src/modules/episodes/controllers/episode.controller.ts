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
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import {
  CharacterEpisodesResponseDto,
  EpisodeResponseDto,
} from '../interfaces/episode.dto';

@Controller('/episodes')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get episodes endpoint',
    description:
      'Get all episode with comment counts, this endpoint is paginated using the page and limit parameters',
    tags: ['Episodes'],
  })
  @ApiQuery({
    name: 'page',
    description: 'Page  Example: ?page=1',
    schema: {
      type: 'number',
    },
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit Example: ?limit=50',
    schema: {
      type: 'number',
    },
  })
  @ApiOkResponse({
    type: EpisodeResponseDto,
    status: 200,
    description: 'Episodes retrieved successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to retrieve episodes',
  })
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

  @Get('/character/:characterId/episodes')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get episodes a character featured in endpoint',
    description: 'Get all episodes a character featured in',
    tags: ['Episodes'],
  })
  @ApiOkResponse({
    type: CharacterEpisodesResponseDto,
    status: 200,
    description: 'Character Episodes retrieved successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to retrieve character episodes',
  })
  async getCharacterEpisodes(
    @Res() res: Response,
    @Param('characterId') characterId: string,
  ): Promise<Response> {
    const episode = await this.episodeService.characterEpisodes(characterId);
    if (!episode.success) {
      return res.status(400).json({ message: episode.message });
    }
    return res
      .status(200)
      .json({ message: episode.message, data: episode.data });
  }
}
