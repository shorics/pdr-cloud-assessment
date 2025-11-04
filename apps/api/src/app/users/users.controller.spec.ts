import { Test, TestingModule } from '@nestjs/testing';
import { UserEdit } from '@pdr-cloud-assessment/shared';

import { NotFoundException } from '@nestjs/common';
import { EntityNotFoundException } from '../data/data.exceptions';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let serviceMock: jest.MockedObject<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: {
          findAll: jest.fn().mockReturnValue('fake-users-list'),
          find: jest.fn().mockReturnValue('fake-user-find'),
          create: jest.fn().mockReturnValue('fake-user-create'),
          update: jest.fn().mockReturnValue('fake-user-update'),
          delete: jest.fn(),
        },
      }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    serviceMock = module.get<jest.MockedObject<UsersService>>(UsersService);
  });

  describe('#findAll', () => {
    it('should return users array', () => {

      const result = controller.findAll();

      expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual('fake-users-list');
    });
  });

  describe('#find', () => {
    it('should return user', () => {
      const id = 'fake-id' as unknown as number;

      const result = controller.find(id);

      expect(serviceMock.find).toHaveBeenCalledTimes(1);
      expect(serviceMock.find).toHaveBeenCalledWith('fake-id');
      expect(result).toEqual('fake-user-find');
    });

    describe('with throwing generic exception', () => {
      beforeEach(() => {
        serviceMock.find.mockImplementationOnce(() => {
          throw new Error('test-error');
        });
      });

      it('should re-throw error', () => {
        const id = 'fake-id' as unknown as number;

        const result = () => controller.find(id);

        expect(result).toThrow('test-error');
      });
    });

    describe('with throwing entity not found exception', () => {
      beforeEach(() => {
        serviceMock.find.mockImplementationOnce(() => {
          throw new EntityNotFoundException('');
        });
      });

      it('should throw not found eception', () => {
        const id = 'fake-id' as unknown as number;

        const result = () => controller.find(id);

        expect(result).toThrow(NotFoundException);
      });
    });
  });

  describe('#create', () => {
    it('should create user', () => {
      const user = 'fake-user' as unknown as UserEdit;

      const result = controller.create(user);

      expect(serviceMock.create).toHaveBeenCalledTimes(1);
      expect(serviceMock.create).toHaveBeenCalledWith('fake-user');
      expect(result).toEqual('fake-user-create');
    });
  });

  describe('#update', () => {
    it('should update user', () => {
      const id = 'fake-id' as unknown as number;
      const user = 'fake-user' as unknown as UserEdit;

      const result = controller.update(id, user);

      expect(serviceMock.update).toHaveBeenCalledTimes(1);
      expect(serviceMock.update).toHaveBeenCalledWith('fake-id', 'fake-user');
      expect(result).toEqual('fake-user-update');
    });

    describe('with throwing generic exception', () => {
      beforeEach(() => {
        serviceMock.update.mockImplementationOnce(() => {
          throw new Error('test-error');
        });
      });

      it('should re-throw error', () => {
        const id = 'fake-id' as unknown as number;
        const user = 'fake-user' as unknown as UserEdit;

        const result = () => controller.update(id, user);

        expect(result).toThrow('test-error');
      });
    });

    describe('with throwing entity not found exception', () => {
      beforeEach(() => {
        serviceMock.update.mockImplementationOnce(() => {
          throw new EntityNotFoundException('');
        });
      });

      it('should throw not found eception', () => {
        const id = 'fake-id' as unknown as number;
        const user = 'fake-user' as unknown as UserEdit;

        const result = () => controller.update(id, user);

        expect(result).toThrow(NotFoundException);
      });
    });
  });

  describe('#delete', () => {
    it('should delete user', () => {
      const id = 'fake-id' as unknown as number;

      controller.delete(id);

      expect(serviceMock.delete).toHaveBeenCalledTimes(1);
      expect(serviceMock.delete).toHaveBeenCalledWith('fake-id');
    });

    describe('with throwing generic exception', () => {
      beforeEach(() => {
        serviceMock.delete.mockImplementationOnce(() => {
          throw new Error('test-error');
        });
      });

      it('should re-throw error', () => {
      const id = 'fake-id' as unknown as number;

        const result = () => controller.delete(id);

        expect(result).toThrow('test-error');
      });
    });

    describe('with throwing entity not found exception', () => {
      beforeEach(() => {
        serviceMock.delete.mockImplementationOnce(() => {
          throw new EntityNotFoundException('');
        });
      });

      it('should throw not found eception', () => {
      const id = 'fake-id' as unknown as number;

        const result = () => controller.delete(id);

        expect(result).toThrow(NotFoundException);
      });
    });
  });
});
