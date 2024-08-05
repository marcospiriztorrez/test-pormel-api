import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherEntity } from './entities/publisher.entity';
import { PublisherController } from './publisher.controller';

@Module({
  controllers: [PublisherController],
  providers: [PublisherService],
  exports: [PublisherService],
  imports: [
    TypeOrmModule.forFeature([PublisherEntity]),
  ]
})
export class PublisherModule {}
