import { Repository } from 'typeorm';
import { Character } from '../entities/character.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CharacterRepository extends Repository<Character> {}
