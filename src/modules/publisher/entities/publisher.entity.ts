import { BookEntity } from '../../book/entities/book.entity';
import {
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('publisher')
export class PublisherEntity {
  @PrimaryGeneratedColumn('uuid')
	id: string;

  @Column()
  name: string;

  @OneToMany(() => BookEntity, book => book.publisher)
  books: BookEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}