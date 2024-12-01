import { Knex } from 'knex';
import { userService } from '../service';

// Mock implementation that's type-safe
const createMockKnex = (): jest.Mocked<Knex> => {
  const mockQuery = {
    select: jest.fn(),
    where: jest.fn(),
    first: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    returning: jest.fn()
  };

  const mockDb = jest.fn(() => mockQuery) as unknown as jest.Mocked<Knex>;
  
  Object.assign(mockDb, mockQuery);

  return mockDb;
};

describe('UserService', () => {
  // Create a type-safe mock Knex instance
  const mockDb = createMockKnex();

  // Create service with mock db
  const service = userService(mockDb);

  // Sample user for testing
  const mockUser = {
    id: 1,
    userName: 'testuser',
    email: 'test@example.com',
    dateOfBirth: new Date('1990-01-01'),
    profilePic: 'http://example.com/pic.jpg',
    passwordHash: 'hashedpassword123'
  };

  beforeEach(() => {
    // Reset all mocks before each test
    Object.values(mockDb).forEach(mock => {
      if (typeof mock.mockReset === 'function') {
        mock.mockReset();
      }
    });
  });

  describe('getAllUsers', () => {
    it('should retrieve all users', async () => {
      (mockDb as any).select.mockImplementation(() => Promise.resolve([mockUser]));

      const users = await service.getAllUsers();

      expect(mockDb).toHaveBeenCalledWith('users');
      expect(mockDb.select).toHaveBeenCalledWith('*');
      expect(users).toEqual([mockUser]);
    });
  });

  describe('getUserById', () => {
    it('should retrieve a user by id', async () => {
      (mockDb as any).where.mockImplementation(() => ({
        first: jest.fn().mockResolvedValue(mockUser)
      }));

      const user = await service.getUserById(1);

      expect(mockDb).toHaveBeenCalledWith('users');
      expect(mockDb.where).toHaveBeenCalledWith({ id: 1 });
      expect(user).toEqual(mockUser);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUserData = {
        userName: 'newuser',
        email: 'new@example.com'
      };

      (mockDb as any).insert.mockImplementation(() => ({
        returning: jest.fn().mockResolvedValue([mockUser])
      }));

      const user = await service.createUser(newUserData);

      expect(mockDb).toHaveBeenCalledWith('users');
      expect(mockDb.insert).toHaveBeenCalledWith(newUserData);
      expect(user).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const updateData = {
        userName: 'updateduser'
      };

      (mockDb as any).where.mockImplementation(() => ({
        update: jest.fn().mockImplementation(() => ({
          returning: jest.fn().mockResolvedValue([mockUser])
        }))
      }));

      const user = await service.updateUser(1, updateData);

      expect(mockDb).toHaveBeenCalledWith('users');
      expect(mockDb.where).toHaveBeenCalledWith({ id: 1 });
      expect(user).toEqual(mockUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      (mockDb as any).where.mockImplementation(() => ({
        delete: jest.fn().mockResolvedValue(1)
      }));

      await service.deleteUser(1);

      expect(mockDb).toHaveBeenCalledWith('users');
      expect(mockDb.where).toHaveBeenCalledWith({ id: 1 });
    });
  });
});