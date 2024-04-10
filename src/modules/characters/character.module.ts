import { Logger, Module } from '@nestjs/common';
import { CharacterRepository } from './repositories/character.repository';
import { Character } from './entities/character.entity';
import { CharacterService } from './services/character.service';
import { ResponseService } from 'src/shared/utils/respond.service';
import { CharacterController } from './controllers/character.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Location } from './entities/location.entity';

@Module({
  imports: [SequelizeModule.forFeature([Character, Location])],
  providers: [CharacterRepository, CharacterService, Logger, ResponseService],
  exports: [CharacterRepository, CharacterService],
  controllers: [CharacterController],
})
export class CharacterModule {}
