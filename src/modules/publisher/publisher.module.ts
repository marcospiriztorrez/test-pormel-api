import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherEntity } from './entities/publisher.entity';

@Module({
  providers: [PublisherService],
  exports: [PublisherService],
  imports: [
    TypeOrmModule.forFeature([PublisherEntity]),
  ]
})
export class PublisherModule {}
