import { Test, TestingModule } from '@nestjs/testing';
import { UserEdit } from '@pdr-cloud-assessment/shared';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {

      const result = service.getData();

      expect(result).toEqual({ message: 'Hello API' });
    });
  });

  describe('findAll', () => {
    it('should return users array', () => {
      const page = 123;

      const result = service.findAll(page);

      expect(result).toEqual([{
        id: 123,
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.test',
        phoneNumber: '213213',
        birthDate: '2025-12-24',
        role: 'admin',
      }]);
    });
  });

  describe('find', () => {
    it('should return user', () => {
      const id = 123;

      const result = service.find(id);

      expect(result).toEqual({
        id: 123,
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.test',
        phoneNumber: '213213',
        birthDate: '2025-12-24',
        role: 'admin',
      });
    });
  });

  describe('create', () => {
    it('should create user', () => {
      const user: UserEdit = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.test',
        phoneNumber: '213213',
        birthDate: '2025-12-24',
        role: 'admin',
      };

      const result = service.create(user);

      expect(result).toEqual({
        id: 101,
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.test',
        phoneNumber: '213213',
        birthDate: '2025-12-24',
        role: 'admin',
      });
    });
  });

  describe('update', () => {
    it('should update user', () => {
      const id = 123;
      const user: UserEdit = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.test',
        phoneNumber: '213213',
        birthDate: '2025-12-24',
        role: 'admin',
      };

      const result = service.update(id, user);

      expect(result).toEqual({
        id: 123,
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.test',
        phoneNumber: '213213',
        birthDate: '2025-12-24',
        role: 'admin',
      });
    });
  });

  describe('delete', () => {
    it('should delete user', () => {
      const id = 123;

      const result = service.delete(id);

      expect(result).toBeUndefined();
    });
  });
});
