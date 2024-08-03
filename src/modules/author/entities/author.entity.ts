import { BookEntity } from '../../book/entities/book.entity';
import {
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

@Entity('author')
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
	id: string;

  @Column()
  name: string;

  @ManyToMany(() => BookEntity, book => book.authors)
  books: BookEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}