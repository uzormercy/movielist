import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IComment } from '../interfaces/comment.interface';

@Entity()
export class Comment implements IComment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  comment: string;

  @Column()
  ipAddressLocation: string;

  @Column({ name: 'created_at', default: new Date().toISOString() })
  createdAt: string;

  @Column({ name: 'updated_at', default: new Date().toISOString() })
  updatedAt?: string;
}
