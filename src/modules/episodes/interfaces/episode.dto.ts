import { ApiProperty } from '@nestjs/swagger';
import { IEpisode } from './episode.interface';
import { IResponseDto } from 'src/shared/types';

export class EpisodeResponseDto implements IResponseDto<IEpisode> {
  @ApiProperty({
    type: String,
    description: 'Message from api',
    example: 'Episodes retrieved successfully',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Data from api',
    example: {
      name: 'Die Hard',
      releaseDate: '12-01-2024',
      code: 'DHS9373',
      comments: [
        {
          comment: 'Interesting movie',
          ipAddressLocation: '127.0.0.1',
        },
      ],
    },
  })
  data: IEpisode;
}

export class CharacterEpisodesResponseDto implements IResponseDto<IEpisode> {
  @ApiProperty({
    type: String,
    description: 'Message from api',
    example: 'Episodes retrieved successfully',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'Data from api',
    example: {
      id: '8398-02838-298372',
      firstName: 'John',
      lastName: 'Doe',
      episodes: [
        {
          id: '83043-3930-349393',
          name: 'Die Hard',
          releaseDate: '12-01-2024',
          code: 'FHSD83',
        },
      ],
    },
  })
  data: IEpisode;
}
