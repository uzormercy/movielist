import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Episode } from '../entities/episode.entity';

@Injectable()
export class EpisodeRepository extends Repository<Episode> {}
