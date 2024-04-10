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
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { CharacterResponseDto } from '../interfaces/character.dto';

@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get Character endpoint',
    description:
      'Get all character, this endpoint can be sorted by name,and gender in an ascending or descending order and filtered by gender, status, and location',
    tags: ['Characters'],
  })
  @ApiQuery({
    name: 'sort',
    description:
      'Sort characters by name or gender in ascending (asc) or descending (desc) order. Example: ?sort=name:asc or ?sort=gender:desc',
    schema: {
      type: 'string',
    },
  })
  @ApiQuery({
    name: 'filter',
    description:
      'Filter characters by gender, status, or location. Example: ?filter=gender:Male or ?filter=status:Alive,location:Earth',
    schema: {
      type: 'string',
    },
  })
  @ApiOkResponse({
    type: CharacterResponseDto,
    status: 200,
    description: 'Characters retrieved successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to retrieve characters',
  })
  async getCharacters(
    @Res() res: Response,
    @Query('sort') sort: string,
    @Query('filter') filters: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
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
