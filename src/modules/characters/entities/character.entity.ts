import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {
  ICharacter,
  TCharacterGender,
  TCharacterStatus,
} from '../interfaces/character.interface';
import { Location } from './location.entity';

@Entity()
export class Character implements ICharacter {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'first_name' })
  firstname: string;

  @Column({ name: 'last_name' })
  lastname: string;

  @Column({ type: String })
  gender: TCharacterGender;

  @Column({ type: String })
  status: TCharacterStatus;

  @Column({ name: 'state_of_origin' })
  stateOfOrigin: string;

  @Column({ name: 'created_at', default: new Date().toISOString() })
  createdAt: string;

  @Column({ name: 'updated_at', default: new Date().toISOString() })
  updatedAt?: string;

  @OneToOne(() => Location, (location) => location.character, { cascade: true })
  @JoinColumn()
  location: Location;
}
