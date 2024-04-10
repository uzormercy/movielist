import { Logger, Module } from '@nestjs/common';
import { EpisodeRepository } from './repositories/episode.repository';
import { Episode } from './entities/episode.entity';
import { EpisodeService } from './services/episode.service';
import { ResponseService } from 'src/shared/utils/respond.service';
import { EpisodeController } from './controllers/episode.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EpisodeCharacter } from './entities/episode-character.entity';
import { CharacterModule } from '../characters/character.module';
import { Character } from '../characters/entities/character.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Episode, EpisodeCharacter, Character]),
    CharacterModule,
  ],
  providers: [EpisodeService, EpisodeRepository, ResponseService, Logger],
  exports: [EpisodeRepository],
  controllers: [EpisodeController],
})
export class EpisodeModule {}
