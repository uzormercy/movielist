import { Injectable, Logger } from '@nestjs/common';
import { ResponseService } from 'src/shared/utils/respond.service';
import { CharacterRepository } from '../repositories/character.repository';
import { IResponseData } from 'src/shared/utils/interfaces';

@Injectable()
export class CharacterService {
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly logger: Logger,
    private readonly response: ResponseService,
  ) {
    this.logger.log(CharacterService.name);
  }

  async getCharacters(
    filters: { [key: string]: any },
    sortOptions: { [key: string]: 'ASC' | 'DESC' },
    page: number,
    limit: number,
  ): Promise<IResponseData> {
    const characters = await this.characterRepository.getCharacters(
      filters,
      sortOptions,
      page,
      limit,
    );
    if (!characters) {
      this.logger.log('Unable to retrieve characters', { characters });
      return this.response.returnResult({
        success: false,
        message: 'Unable to retrieve characters',
      });
    }
    return this.response.returnResult({
      success: true,
      message: 'Characters retrieved successfully',
      data: characters,
    });
  }
}
