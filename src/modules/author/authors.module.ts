import { Module } from '@nestjs/common';
import { AuthorService } from './authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { AuthorController } from './authors.controller';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService],
  imports: [
    TypeOrmModule.forFeature([AuthorEntity]),
  ]
})
export class AuthorModule {}
