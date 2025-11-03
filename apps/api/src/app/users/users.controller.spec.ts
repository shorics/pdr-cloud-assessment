import { Test, TestingModule } from '@nestjs/testing';
import { UserEdit } from '@pdr-cloud-assessment/shared';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return users array', () => {
      const page = 123;

      const result = controller.findAll(page);

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

      const result = controller.find(id);

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

      const result = controller.create(user);

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

      const result = controller.update(id, user);

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

      const result = controller.delete(id);

      expect(result).toBeUndefined();
    });
  });
});
