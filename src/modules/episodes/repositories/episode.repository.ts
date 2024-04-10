import { Injectable } from '@nestjs/common';
import { Episode } from '../entities/episode.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Character } from '../../characters/entities/character.entity';
import { col, fn } from 'sequelize';
import { Comment } from 'src/modules/comments/entities/comment.entity';

@Injectable()
export class EpisodeRepository {
  constructor(
    @InjectModel(Episode)
    private episodeEntity: typeof Episode,
    @InjectModel(Character)
    private characterEntity: typeof Character,
  ) {}

  async getEpisodesWithComments(): Promise<any> {
    const episodes = await this.episodeEntity.findAll({
      attributes: {
        include: [[fn('COUNT', col('comments.id')), 'commentCount']],
      },
      include: [
        {
          model: Comment,
          as: 'comments',
          attributes: [],
        },
      ],
      group: ['Episode.id'],
      order: [['releaseDate', 'ASC']],
    });

    return episodes;
  }

  async getEpisodesByCharacter(id: string): Promise<any> {
    return this.characterEntity.findByPk(id, {
      include: [
        {
          model: Episode,
          through: { attributes: ['name', 'releaseDate', 'code'] },
        },
      ],
    });
  }

  async getEpisodeById(id: string): Promise<Episode> {
    return this.episodeEntity.findByPk(id);
  }
}
