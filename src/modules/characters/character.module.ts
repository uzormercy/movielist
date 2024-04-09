import { Module } from '@nestjs/common';
import { CharacterRepository } from './repositories/character.repository';
import { LocationRepository } from './repositories/location.repository';

@Module({
  providers: [CharacterRepository, LocationRepository],
})
export class CharacterModule {}
