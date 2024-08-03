import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { AuthorService } from '../author/authors.service';
import { PublisherService } from '../publisher/publisher.service';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthorEntity } from '../author/entities/author.entity';
import { PublisherEntity } from '../publisher/entities/publisher.entity';
import { BookEntity } from './entities/book.entity';
import { HttpMessages } from '../../common/enums/http-messages.enum';

describe('BookService', () => {
  let service: BookService;
  let authorService: AuthorService;
  let publisherService: PublisherService;
  let repository: Repository<BookEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: AuthorService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: PublisherService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(BookEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              select: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              take: jest.fn().mockReturnThis(),
              getManyAndCount: jest.fn(),
            })
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    authorService = module.get<AuthorService>(AuthorService);
    publisherService = module.get<PublisherService>(PublisherService);
    repository = module.get<Repository<BookEntity>>(getRepositoryToken(BookEntity));
  });

  it('should create a book successfully', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Test Book',
      isbn: '1234567890',
      pages: 100,
      year: 2021,
      authorsIds: ["1", "2"],
      publisherId: "1",
    };

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
      isbn: '5555-5555-5555-5555', 
      pages: 50, 
      year: 2021, 
      authors, 
      publisher, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };

    jest.spyOn(authorService, 'findOne').mockResolvedValueOnce(authors[0]);
    jest.spyOn(authorService, 'findOne').mockResolvedValueOnce(authors[1]);
    jest.spyOn(publisherService, 'findOne').mockResolvedValueOnce(publisher);
    jest.spyOn(repository, 'create').mockReturnValue(book);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(book);

    const result = await service.create(createBookDto);

    expect(result).toEqual({
      data: book,
      statusCode: HttpStatus.CREATED,
      message: HttpMessages.BOOK_CREATED,
    });
  });

  it('should throw an error when book creation fails', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Test Book',
      isbn: '1234567890',
      pages: 100,
      year: 2021,
      authorsIds: ["42342341", "223423423"],
      publisherId: "1",
    };

    jest.spyOn(authorService, 'findOne').mockRejectedValueOnce(new Error('Bad Request Exception'));

    await expect(service.create(createBookDto)).rejects.toThrow('Bad Request Exception');
  });

  it('should find all books successfully', async () => {
    const paginationDto = {
      search: '',
      page: 1,
      limit: 10,
    };

    const books: BookEntity[] = [
      { 
        id: '1', 
        title: 'Test Book 1', 
        isbn: '5555-5555-5555-5555', 
        pages: 50, 
        year: 2021, 
        authors: [], 
        publisher: null, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: '2', 
        title: 'Test Book 2', 
        isbn: '5555-5555-8888-4444', 
        pages: 50, 
        year: 2021, 
        authors: [], 
        publisher: null, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
    ];

    jest.spyOn(repository.createQueryBuilder(), 'getManyAndCount').mockResolvedValueOnce([books, books.length]);

    const result = await service.findAll(paginationDto);

    expect(result).toEqual({
      page: 1,
      limit: 10,
      data: books,
      total: books.length,
      statusCode: HttpStatus.OK,
      message: HttpMessages.BOOKS_LISTED,
    });
  })

  it('should throw an error when finding all books fails', async () => {
    const paginationDto = {
      search: '',
      page: 1,
      limit: 10,
    };

    jest.spyOn(repository.createQueryBuilder(), 'getManyAndCount').mockRejectedValueOnce(new Error('Bad Request Exception'));

    await expect(service.findAll(paginationDto)).rejects.toThrow('Bad Request Exception');
  });
  
  it('should find all books with search successfully', async () => {
    const paginationDto = {
      search: 'Test',
      page: 1,
      limit: 10,
    };

    const books: BookEntity[] = [
      { 
        id: '1', 
        title: 'Test Book 1', 
        isbn: '5555-5555-5555-5555', 
        pages: 50, 
        year: 2021, 
        authors: [], 
        publisher: null, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: '2', 
        title: 'Test Book 2', 
        isbn: '5555-5555-8888-4444', 
        pages: 50, 
        year: 2021, 
        authors: [], 
        publisher: null, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
    ];

    jest.spyOn(repository.createQueryBuilder(), 'andWhere').mockReturnThis();
    jest.spyOn(repository.createQueryBuilder(), 'getManyAndCount').mockResolvedValueOnce([books, books.length]);

    const result = await service.findAll(paginationDto);

    expect(result).toEqual({
      page: 1,
      limit: 10,
      data: books,
      total: books.length,
      statusCode: HttpStatus.OK,
      message: HttpMessages.BOOKS_LISTED,
    });
  });

  it('should throw an error when finding all books with search fails', async () => {
    const paginationDto = {
      search: 'Test',
      page: 1,
      limit: 10,
    };

    jest.spyOn(repository.createQueryBuilder(), 'andWhere').mockReturnThis();
    jest.spyOn(repository.createQueryBuilder(), 'getManyAndCount').mockRejectedValueOnce(new Error('Bad Request Exception'));

    await expect(service.findAll(paginationDto)).rejects.toThrow('Bad Request Exception');
  });

  it('should throw an error when pagination is not provided', async () => {
    const paginationDto = null;

    await expect(service.findAll(paginationDto)).rejects.toThrow('Bad Request Exception');
  });

  it('should find one book successfully', async () => {
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
      isbn: '5555-5555-5555-5555', 
      pages: 50, 
      year: 2021, 
      authors,
      publisher,
      createdAt: new Date(), 
      updatedAt: new Date() 
    };

    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(book);

    const result = await service.findOne('1');

    expect(result.data).toEqual(book);
  });

  it('should throw an error when finding one book fails', async () => {
    jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error('Internal server error'));

    await expect(service.findOne('1')).rejects.toThrow('Internal server error');
  });

  it('should throw an error when book is not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

    await expect(service.findOne('1')).rejects.toThrow('Book not found');
  });
});