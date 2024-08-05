import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { AuthorService } from './authors.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly publisherService: AuthorService) {}

  @Get()
  async findAll() {
    return await this.publisherService.findAll();
  }
}
