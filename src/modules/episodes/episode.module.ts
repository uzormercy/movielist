import { Module } from '@nestjs/common';
import { EpisodeRepository } from './repositories/episode.repository';

@Module({
  providers: [EpisodeRepository],
})
export class EpisodeModule {}
