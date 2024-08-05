import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { AuthorService } from '../author/authors.service';
import { PublisherService } from '../publisher/publisher.service';
import { AuthorEntity } from '../author/entities/author.entity';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { IPaginationResponse } from '../../common/interfaces/pagination-response.interface';
import { ResponseFormatter } from '../../common/response/formatter-service';
import { HttpMessages } from '../../common/enums/http-messages.enum';
import { IBaseResponse } from '../../common/interfaces/base-response.interface';

@Injectable()
export class BookService extends ResponseFormatter {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    private readonly authorService: AuthorService,
    private readonly publisherService: PublisherService
  ) {
    super();
  }

  async create(createBookDto: CreateBookDto): Promise<IBaseResponse<BookEntity>> {
    try {
      let authors: AuthorEntity[] = [];
      for await (const authorId of createBookDto.authorsIds) {
        let author = await this.authorService.findOne(authorId);
        if (!author) {
          throw new NotFoundException(
            HttpMessages.AUTHOR_NOT_FOUND,
          );
        }
        authors.push(author);
      }

      const publisher = await this.publisherService.findOne(createBookDto.publisherId);
      if (!publisher) {
        throw new NotFoundException(
          HttpMessages.PUBLISHER_NOT_FOUND,
        );
      }

      const book = this.bookRepository.create({
        ...createBookDto,
        authors,
        publisher
      });

      await this.bookRepository.save(book);

      return this.standartResponse(
        book,
        HttpStatus.CREATED,
        HttpMessages.BOOK_CREATED,
      );
    } catch (error) {
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        HttpMessages.BOOK_NOT_CREATED,
      );
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<IPaginationResponse<BookEntity>> {
    try {
      if (!paginationDto) {
        throw new BadRequestException(
          HttpStatus.BAD_REQUEST,
          HttpMessages.PAGINATION_NOT_PROVIDED,
        );
      }

      const queryBuilder = this.bookRepository
        .createQueryBuilder('book')
        .leftJoinAndSelect('book.authors', 'authors')
        .leftJoinAndSelect('book.publisher', 'publisher')
        .select([
          'book.id',
          'book.title',
          'book.isbn',
          'book.year',
          'book.pages',
          'authors.id',
          'authors.name',
          'publisher.id',
          'publisher.name'
        ]);
      
      if (paginationDto.search !== undefined && paginationDto.search !== '') {
         queryBuilder.andWhere(
          'book.title ILIKE :search OR authors.name ILIKE :search  OR publisher.name ILIKE :search',
          {
            search: `%${paginationDto.search}%`,
          },
        );
      }  

      const books = await this.paginate(
        queryBuilder, 
        paginationDto, 
        HttpStatus.OK, 
        HttpMessages.BOOKS_LISTED
      );
      
      return books;
    } catch (error) {
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        HttpMessages.BOOK_NOT_LISTED,
      );
    }
  }

  async findOne(id: string): Promise<IBaseResponse<BookEntity>> {
    try {
      const book = await this.bookRepository.findOne({
        where: { id },
        relations: ['authors', 'publisher']
      });
      
      if (!book) {
        throw new NotFoundException(
          HttpMessages.BOOK_NOT_FOUND,
        );
      }

      return this.standartResponse<BookEntity>(
        book,
        HttpStatus.OK,
        HttpMessages.BOOK_LISTED,
      );
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(
          HttpMessages.BOOK_NOT_FOUND
        );
      }

      throw new InternalServerErrorException(
        HttpMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<IBaseResponse<BookEntity>> {
    const data = await this.findOne(id);
    const book: BookEntity = data.data;

    if (
      updateBookDto.publisherId && 
      updateBookDto.publisherId != book.publisher.id
    ) {
      const publisher = await this.publisherService.findOne(updateBookDto.publisherId);
      if (!publisher) {
        throw new NotFoundException(
          HttpMessages.PUBLISHER_NOT_FOUND,
        );
      }
      book.publisher = publisher;
    }

    if (updateBookDto.authorsIds.length > 0) {
      let authors: AuthorEntity[] = [];
      for await (const authorId of updateBookDto.authorsIds) {
        let author = await this.authorService.findOne(authorId);
        if (!author) {
          throw new NotFoundException(
            HttpMessages.AUTHOR_NOT_FOUND,
          );
        }
        authors.push(author);
      }
      book.authors = authors;
    }

    if ( 
      updateBookDto.title &&
      book.title != updateBookDto.title
    ) {
      book.title = updateBookDto.title;
    }

    if (
      updateBookDto.isbn && 
      book.isbn != updateBookDto.isbn
    ) {
      book.isbn = updateBookDto.isbn;
    }

    if (
      updateBookDto.year && 
      book.year != updateBookDto.year
    ) {
      book.year = updateBookDto.year;
    }

    if (
      updateBookDto.pages &&
      book.pages != updateBookDto.pages
    ) {
      book.pages = updateBookDto.pages;
    }

    const newBook = this.bookRepository.create({
      ...book,
    });

    await this.bookRepository.save(newBook);

    return this.standartResponse<BookEntity>(
      newBook,
      HttpStatus.OK,
      HttpMessages.BOOK_UPDATED,
    );
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.bookRepository.delete(id);
  }
}
