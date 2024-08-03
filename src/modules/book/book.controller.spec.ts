import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { HttpMessages } from '../../common/enums/http-messages.enum';
import { HttpStatus } from '@nestjs/common';
import { BookEntity } from './entities/book.entity';
import { AuthorEntity } from '../author/entities/author.entity';
import { PublisherEntity } from '../publisher/entities/publisher.entity';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  describe('create', () => {
    it('should create a book (success)', async () => {
      const authors: AuthorEntity[] = [
        { 
          id: '1', 
          name: 'Author 1', 
          books: [], 
          createdAt: new Date(), 
          updatedAt: new Date() 
        }, 
        { 
          id: '2', 
          name: 'Author 2', 
          books: [], 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
      ];

      const publisher: PublisherEntity = { 
        id: '1', 
        name: 'Publisher 1', 
        books: [], 
        createdAt: new Date(), 
        updatedAt: new Date() 
      };

      const book: BookEntity = {
        id: '1',
        title: 'Test Book',
        isbn: '1234567890',
        pages: 100,
        year: 2021,
        authors,
        publisher,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        isbn: '1234567890',
        pages: 100,
        year: 2021,
        authorsIds: ["1", "2"],
        publisherId: "1",
      }

      const result = {
        data: book,
        statusCode: HttpStatus.CREATED,
        message: HttpMessages.BOOK_LISTED,
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createBookDto)).toBe(result);
    });

    it('should fail to create a book', async () => {
      const createBookDto: CreateBookDto = { 
        title: 'Test Book', 
        isbn: '1234567890',
        pages: 100,
        year: 2021,
        publisherId: 'Test Publisher',
        authorsIds: ['Test Author', 'Test Author 2'],
      };

      jest.spyOn(service, 'create').mockRejectedValue(new Error('Failed to create book'));

      await expect(controller.create(createBookDto)).rejects.toThrow('Failed to create book');
    });
  });

  describe('findOne', () => {
    it('should find a book by id (success)', async () => {
      const authors: AuthorEntity[] = [
        { 
          id: '1', 
          name: 'Author 1', 
          books: [], 
          createdAt: new Date(), 
          updatedAt: new Date() 
        }, 
        { 
          id: '2', 
          name: 'Author 2', 
          books: [], 
          createdAt: new Date(), 
          updatedAt: new Date() 
        },
      ];

      const publisher: PublisherEntity = { 
        id: '1', 
        name: 'Publisher 1', 
        books: [], 
        createdAt: new Date(), 
        updatedAt: new Date() 
      };

      const book: BookEntity = {
        id: '1',
        title: 'Test Book',
        isbn: '1234567890',
        pages: 100,
        year: 2021,
        authors,
        publisher,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = {
        data: book,
        statusCode: HttpStatus.OK,
        message: HttpMessages.BOOK_LISTED,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });

    it('should fail to find a book by id', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new Error('Book not found'));

      await expect(controller.findOne('1')).rejects.toThrow('Book not found');
    });
  });
});