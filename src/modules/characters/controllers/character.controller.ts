import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CharacterService } from '../services/character.service';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCharacters(
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
    @Query('sort') sort: string,
    @Query('filter') filters: string,
  ): Promise<Response> {
    const parsedFilters = filters ? JSON.parse(filters) : {};
    const parsedSortOptions = sort ? JSON.parse(sort) : {};
    const characters = await this.characterService.getCharacters(
      parsedFilters,
      parsedSortOptions,
      page,
      limit,
    );
    if (!characters.success) {
      return res.status(400).json({ message: characters.message });
    }
    return res
      .status(200)
      .json({ message: characters.message, data: characters.data });
  }
}
