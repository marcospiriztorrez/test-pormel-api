import {
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { AuthorEntity } from '../../author/entities/author.entity';
import { PublisherEntity } from '../../publisher/entities/publisher.entity';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
	id: string;

  @Column()
  title: string;

  @Column()
  isbn: string;

  @Column()
  year: number;

  @Column()
  pages: number;

  @ManyToOne(() => PublisherEntity, publisher => publisher.books)
  @JoinColumn()
  publisher: PublisherEntity;

  @ManyToMany(() => AuthorEntity, author => author.books)
  @JoinTable()
  authors: AuthorEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}