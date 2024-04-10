import { InjectModel } from '@nestjs/sequelize';
import { Character } from '../entities/character.entity';
import { Injectable } from '@nestjs/common';
import { OrderItem } from 'sequelize';
import { Location } from '../entities/location.entity';

@Injectable()
export class CharacterRepository {
  constructor(
    @InjectModel(Character)
    private characterEntity: typeof Character,
  ) {}
  async getCharacters(
    filters: { [key: string]: any } = {},
    sortOptions: { [key: string]: 'ASC' | 'DESC' } = {},
    page: number = 1,
    limit: number = 25,
  ): Promise<Character[]> {
    const offset = (page - 1) * limit;

    const order: OrderItem[] = Object.entries(sortOptions).map(
      ([key, value]): OrderItem => [key, value],
    );

    return await this.characterEntity.findAll({
      where: filters,
      order: order.length > 0 ? order : [['id', 'ASC']], // Default sorting if no sortOptions provided
      offset,
      limit,
      include: [
        {
          model: Location,
          as: 'location',
          attributes: ['id', 'name', 'latitude', 'longitude'],
        },
      ],
    });
  }
}
