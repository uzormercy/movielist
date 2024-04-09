import { IEpisode } from '../interfaces/episode.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Episode implements IEpisode {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'release_date' })
  releaseDate: string;

  @Column()
  code: string;

  @Column({ name: 'created_at', default: new Date().toISOString() })
  createdAt?: string;

  @Column({ name: 'updated_at', default: new Date().toISOString() })
  updatedAt?: string;
}
