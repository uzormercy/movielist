import { Injectable } from '@nestjs/common';
import { Episode } from '../entities/episode.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from '../../comments/entities/comment.entity';
import { Character } from '../../characters/entities/character.entity';
import { literal } from 'sequelize';

@Injectable()
export class EpisodeRepository {
  constructor(
    @InjectModel(Episode)
    private episodeEntity: typeof Episode,
    @InjectModel(Character)
    private characterEntity: typeof Character,
  ) {}

  async getEpisodesWithComments(
    page: number = 1,
    limit: number = 25,
  ): Promise<any> {
    const offset = (page - 1) * limit;
    return await this.episodeEntity.findAndCountAll({
      include: [
        {
          model: Comment,
          as: 'comments',
          attributes: [],
          required: false,
        },
      ],
      attributes: {
        include: [
          // [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'commentCount'],
          [literal('COUNT(DISTINCT(comments.id))'), 'commentCount'],
          // Include any other attributes you need for the Episode model
        ],
      },
      group: ['Episode.id', 'comments.id'],
      order: [['releaseDate', 'ASC']],
      offset,
      limit,
    });
  }

  async getEpisodesByCharacter(id: string): Promise<any> {
    return this.characterEntity.findByPk(id, {
      include: [
        {
          model: Episode,
          through: { attributes: ['name', 'releaseDate', 'code'] }, // Exclude attributes from the join table
        },
      ],
    });
  }

  async getEpisodeById(id: string): Promise<Episode> {
    return this.episodeEntity.findByPk(id);
  }
}
