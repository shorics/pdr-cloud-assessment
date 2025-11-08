import { Test, TestingModule } from '@nestjs/testing';
import { User, UserEdit } from '@pdr-cloud-assessment/shared';

import { DataUsersService } from './data-users.service';
import { saveJsonFile as _saveJsonFile } from './data-users.utils';
import { EntityNotFoundException } from './data.exceptions';

jest.mock('./data-users.utils', () => ({
  saveJsonFile: jest.fn(),
}));

const saveJsonFileMock = _saveJsonFile as unknown as jest.Mock;

describe('DataUsersService', () => {
  let service: DataUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: DataUsersService,
        useValue: new DataUsersService(
          [ { id: 1, fake: 'user-1' } as unknown as User ],
          'fake-path'
        ),
      }],
    }).compile();

    service = module.get<DataUsersService>(DataUsersService);
  });

  afterEach(() => {
    saveJsonFileMock.mockClear();
  });

  describe('#findAll', () => {
    it('should return users array', async () => {

      const result = await service.findAll();

      expect(result).toEqual([{ id: 1, fake: 'user-1' }]);
    });
  });

  describe('#find', () => {
    let id: number;

    describe('with existing user', () => {
      beforeEach(() => {
        id = 1;
      });

      it('should return user', async () => {

        const result = await service.find(id);

        expect(result).toEqual({ id: 1, fake: 'user-1' });
      });
    });

    describe('with non-existent user', () => {
      beforeEach(() => {
        id = 2;
      });

      it('should throw "entity not found"', () => {
        const result = () => service.find(id);

        expect(result).rejects.toThrow(EntityNotFoundException);
      });
    });
  });

  describe('#create', () => {
    it('should create user', async () => {
      const user = { fake: 'user-2' } as unknown as UserEdit;

      const resultEntity = await service.create(user);
      const resultData = await service.findAll();

      expect(resultEntity).toEqual({ id: 2, fake: 'user-2' });
      expect(resultData).toEqual([
        { id: 1, fake: 'user-1' },
        { id: 2, fake: 'user-2' },
      ]);
      expect(saveJsonFileMock).toHaveBeenCalledTimes(1);
      expect(saveJsonFileMock).toHaveBeenCalledWith('fake-path', [
        { id: 1, fake: 'user-1' },
        { id: 2, fake: 'user-2' },
      ]);
    });
  });

  describe('#update', () => {
    let id: number;

    describe('with existing user', () => {
      beforeEach(() => {
        id = 1;
      });

      it('should update user', async () => {
        const user = { fake: 'user-1-updated' } as unknown as UserEdit;

        const resultEntity = await service.update(id, user);
        const resultData = await service.findAll();

        expect(resultEntity).toEqual({ id: 1, fake: 'user-1-updated' });
        expect(resultData).toEqual([{ id: 1, fake: 'user-1-updated' }]);
        expect(saveJsonFileMock).toHaveBeenCalledTimes(1);
        expect(saveJsonFileMock).toHaveBeenCalledWith('fake-path', [
          { id: 1, fake: 'user-1-updated' }
        ]);
      });
    });

    describe('with non-existent user', () => {
      beforeEach(() => {
        id = 2;
      });

      it('should throw "entity not found"', () => {
        const user = { fake: 'user-1-updated' } as unknown as UserEdit;

        const result = () => service.update(id, user);

        expect(result).rejects.toThrow(EntityNotFoundException);
      });
    });
  });

  describe('#delete', () => {
    let id: number;

    describe('with existing user', () => {
      beforeEach(() => {
        id = 1;
      });

      it('should delete user', async () => {

        service.delete(id);
        const resultData = await service.findAll();

        expect(resultData).toEqual([]);
        expect(saveJsonFileMock).toHaveBeenCalledTimes(1);
        expect(saveJsonFileMock).toHaveBeenCalledWith('fake-path', []);
      });
    });

    describe('with non-existent user', () => {
      beforeEach(() => {
        id = 2;
      });

      it('should throw "entity not found"', () => {

        const result = () => service.delete(id);

        expect(result).rejects.toThrow(EntityNotFoundException);
      });
    });
  });
});
