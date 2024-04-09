import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ILocation } from '../interfaces/character.interface';
import { Character } from './character.entity';

@Entity()
export class Location implements ILocation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column({ name: 'created_at', default: new Date().toISOString() })
  createdAt: string;

  @Column({ name: 'updated_at', default: new Date().toISOString() })
  updatedAt?: string;

  @OneToOne(() => Character, (character) => character.location)
  @JoinColumn()
  character: Character;
}
