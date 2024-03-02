import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../services/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { User } from '../../data/entities/user.entity';

describe('UsersService', () => {
  let usersService: UsersService;
  let mockFindOneBy: jest.Mock; // Keep a reference to the mock function


  beforeEach(async () => {
    mockFindOneBy = jest.fn(); // Initialize the mock function

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: mockFindOneBy
          },
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(), // Mock Logger's log method
          },
        },
      ],
    }).compile();

    usersService = app.get<UsersService>(UsersService);
  });

  describe('findOne', () => {
    it('should call the users repository"', async () => {
      const user1 = new User();
      user1.id = 1;
      mockFindOneBy.mockResolvedValue(user1); // Set the mock implementation for this test case

      const result = await usersService.findOne(1);
      expect(result).toBe(user1);
    });
  });
});
