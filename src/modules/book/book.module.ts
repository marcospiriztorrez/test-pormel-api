import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { AuthorModule } from '../author/authors.module';
import { PublisherModule } from '../publisher/publisher.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    AuthorModule,
    PublisherModule,
  ],
})
export class BookModule {}
