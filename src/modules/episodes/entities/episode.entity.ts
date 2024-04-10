import { Tables } from 'src/shared/constants/table';
import { Comment } from '../../comments/entities/comment.entity';
import { IEpisode } from '../interfaces/episode.interface';
import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Character } from '../../characters/entities/character.entity';
import { EpisodeCharacter } from './episode-character.entity';

@Table({
  tableName: Tables.EPISODES,
  timestamps: true,
  underscored: true,
  modelName: 'Episode',
})
export class Episode extends Model<Episode> implements IEpisode {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  releaseDate: string;

  @Column
  code: string;

  @HasMany(() => Comment)
  comments: Comment[];

  @BelongsToMany(() => Character, () => EpisodeCharacter)
  characters: Character[];
}
