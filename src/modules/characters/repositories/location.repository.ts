import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Location } from '../entities/location.entity';

@Injectable()
export class LocationRepository extends Repository<Location> {}
