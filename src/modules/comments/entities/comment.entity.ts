import { IComment } from '../interfaces/comment.interface';
import { Episode } from '../../episodes/entities/episode.entity';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Tables } from 'src/shared/constants/table';

@Table({
  tableName: Tables.COMMENTS,
  timestamps: true,
  underscored: true,
  modelName: 'Comment',
})
export class Comment extends Model<Comment> implements IComment {
  @PrimaryKey
  @Column
  id: string;

  @Column
  comment: string;

  @Column
  ipAddressLocation: string;

  @ForeignKey(() => Episode)
  @Column
  episodeId: string;

  @BelongsTo(() => Episode)
  episode: Episode;
}
