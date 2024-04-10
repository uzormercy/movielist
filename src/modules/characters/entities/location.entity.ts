import { ILocation } from '../interfaces/character.interface';
import { Character } from './character.entity';
import { Tables } from 'src/shared/constants/table';
import {
  BelongsTo,
  Column,
  ForeignKey,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';

@Table({
  tableName: Tables.LOCATIONS,
  timestamps: true,
  underscored: true,
  modelName: 'Location',
})
export class Location extends Model<Location> implements ILocation {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  latitude: string;

  @Column
  longitude: string;

  @ForeignKey(() => Character)
  @Column
  characterId: string;

  @BelongsTo(() => Character)
  character: Character;
}
