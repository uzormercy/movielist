import {
  ICharacter,
  ECharacterGender,
  ECharacterStatus,
} from '../interfaces/character.interface';
import { Location } from './location.entity';
import { Tables } from 'src/shared/constants/table';
import { DataTypes } from 'sequelize';
import {
  Column,
  Model,
  HasOne,
  PrimaryKey,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { Episode } from 'src/modules/episodes/entities/episode.entity';
import { EpisodeCharacter } from 'src/modules/episodes/entities/episode-character.entity';

@Table({
  tableName: Tables.CHARACTERS,
  timestamps: true,
  underscored: true,
  modelName: 'Character',
})
export class Character extends Model<Character> implements ICharacter {
  @PrimaryKey
  @Column
  id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({
    type: DataTypes.ENUM(...Object.values(ECharacterGender)),
    allowNull: false,
  })
  gender: ECharacterGender;

  @Column({
    type: DataTypes.ENUM(...Object.values(ECharacterStatus)),
    allowNull: false,
    defaultValue: ECharacterStatus.UNKNOWN,
  })
  status: ECharacterStatus;

  @Column
  stateOfOrigin: string;

  @HasOne(() => Location, 'characterId')
  location: Location;

  @BelongsToMany(() => Episode, () => EpisodeCharacter)
  episodes: Episode[];
}
