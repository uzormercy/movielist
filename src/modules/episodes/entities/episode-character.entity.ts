import { Tables } from '../../../shared/constants/table';
import { IEpisodeCharacter } from '../interfaces/episode.interface';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Episode } from './episode.entity';
import { Character } from '../../characters/entities/character.entity';

@Table({
  tableName: Tables.EPISODES_CHARACTER,
  timestamps: true,
  underscored: true,
  modelName: 'EpisodeCharacter',
})
export class EpisodeCharacter
  extends Model<EpisodeCharacter>
  implements IEpisodeCharacter
{
  @PrimaryKey
  @Column
  id: string;

  @ForeignKey(() => Character)
  @Column
  characterId: string;

  @ForeignKey(() => Episode)
  @Column
  episodeId: string;

  @BelongsTo(() => Episode)
  episode: Episode;

  @BelongsTo(() => Character)
  character: Character;
}
