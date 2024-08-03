import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthorEntity } from '../author/entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async findOne(id: string): Promise<AuthorEntity> {
    return await this.authorRepository.findOne({
      where: { id },
    });
  }
}
