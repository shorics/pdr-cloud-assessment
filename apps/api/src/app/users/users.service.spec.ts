import { Test, TestingModule } from '@nestjs/testing';
import { UserEdit } from '@pdr-cloud-assessment/shared';

import { DataUsersService } from '../data/data-users.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let dataServiceMock: jest.MockedObject<DataUsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DataUsersService,
          useValue: {
            findAll: jest.fn().mockReturnValue('fake-users-list'),
            find: jest.fn().mockReturnValue('fake-user-find'),
            create: jest.fn().mockReturnValue('fake-user-create'),
            update: jest.fn().mockReturnValue('fake-user-update'),
            delete: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    dataServiceMock = module.get<jest.MockedObject<DataUsersService>>(DataUsersService);
  });

  describe('#findAll', () => {
    it('should return users array', () => {
      const page = 'fake-page' as unknown as number;

      const result = service.findAll(page);

      expect(dataServiceMock.findAll).toHaveBeenCalledTimes(1);
      expect(dataServiceMock.findAll).toHaveBeenCalledWith('fake-page');
      expect(result).toEqual('fake-users-list');
    });
  });

  describe('#find', () => {
    it('should return user', () => {
      const id = 'fake-id' as unknown as number;

      const result = service.find(id);

      expect(dataServiceMock.find).toHaveBeenCalledTimes(1);
      expect(dataServiceMock.find).toHaveBeenCalledWith('fake-id');
      expect(result).toEqual('fake-user-find');
    });
  });

  describe('#create', () => {
    it('should create user', () => {
      const user = 'fake-user' as unknown as UserEdit;

      const result = service.create(user);

      expect(dataServiceMock.create).toHaveBeenCalledTimes(1);
      expect(dataServiceMock.create).toHaveBeenCalledWith('fake-user');
      expect(result).toEqual('fake-user-create');
    });
  });

  describe('#update', () => {
    it('should update user', () => {
      const id = 'fake-id' as unknown as number;
      const user = 'fake-user' as unknown as UserEdit;

      const result = service.update(id, user);

      expect(dataServiceMock.update).toHaveBeenCalledTimes(1);
      expect(dataServiceMock.update).toHaveBeenCalledWith('fake-id', 'fake-user');
      expect(result).toEqual('fake-user-update');
    });
  });

  describe('#delete', () => {
    it('should delete user', () => {
      const id = 'fake-id' as unknown as number;

      service.delete(id);

      expect(dataServiceMock.delete).toHaveBeenCalledTimes(1);
      expect(dataServiceMock.delete).toHaveBeenCalledWith('fake-id');
    });
  });
});
