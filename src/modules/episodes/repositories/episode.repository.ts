import { Injectable } from '@nestjs/common';
import { Episode } from '../entities/episode.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Character } from '../../characters/entities/character.entity';
import { QueryTypes } from 'sequelize';

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
    const sqlQuery = `
        SELECT 
            e.*, 
            COALESCE(c.comment_count, 0) AS comment_count
        FROM 
            episodes e
        LEFT JOIN (
            SELECT 
                episode_id, 
                COUNT(*) AS comment_count
            FROM 
                comments
            GROUP BY 
                episode_id
        ) c ON e.id = c.episode_id
        ORDER BY 
            e.release_date ASC
        OFFSET 
            :offset
        LIMIT 
            :limit;
    `;

    const replacements = {
      offset: (page - 1) * limit,
      limit: limit,
    };

    return this.episodeEntity.sequelize.query(sqlQuery, {
      replacements: replacements,
      type: QueryTypes.SELECT,
    });
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
