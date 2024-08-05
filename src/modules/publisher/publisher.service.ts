import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublisherEntity } from './entities/publisher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(PublisherEntity)
    private readonly publisherRepository: Repository<PublisherEntity>,
  ) {}

  async findAll(): Promise<PublisherEntity[]> {
    return await this.publisherRepository.find();
  }

  async findOne(id: string): Promise<PublisherEntity> {
    return await this.publisherRepository.findOne({
      where: { id },
    });
  }
}
