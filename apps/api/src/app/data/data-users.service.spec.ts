import { Test, TestingModule } from '@nestjs/testing';
import { UserEdit } from '@pdr-cloud-assessment/shared';

import { DataUsersService } from './data-users.service';
import { EntityNotFoundException } from './data.exceptions';

describe('DataUsersService', () => {
  let service: DataUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataUsersService],
    }).compile();

    service = module.get<DataUsersService>(DataUsersService);
  });

  beforeEach(() => {
    const user = { fake: 'user-1' } as unknown as UserEdit;

    service.create(user);
  });

  describe('#findAll', () => {
    it('should return users array', () => {

      const result = service.findAll();

      expect(result).toEqual([{ id: 1, fake: 'user-1' }]);
    });
  });

  describe('#find', () => {
    let id: number;

    describe('with existing user', () => {
      beforeEach(() => {
        id = 1;
      });

      it('should return user', () => {

        const result = service.find(id);

        expect(result).toEqual({ id: 1, fake: 'user-1' });
      });
    });

    describe('with non-existent user', () => {
      beforeEach(() => {
        id = 2;
      });

      it('should throw "entity not found"', () => {
        const result = () => service.find(id);

        expect(result).toThrow(EntityNotFoundException);
      });
    });
  });

  describe('#create', () => {
    it('should create user', () => {
      const user = { fake: 'user-2' } as unknown as UserEdit;

      const resultEntity = service.create(user);
      const resultData = service.findAll();

      expect(resultEntity).toEqual({ id: 2, fake: 'user-2' });
      expect(resultData).toEqual([
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

      it('should update user', () => {
        const user = { fake: 'user-1-updated' } as unknown as UserEdit;

        const resultEntity = service.update(id, user);
        const resultData = service.findAll();

        expect(resultEntity).toEqual({ id: 1, fake: 'user-1-updated' });
        expect(resultData).toEqual([{ id: 1, fake: 'user-1-updated' }]);
      });
    });

    describe('with non-existent user', () => {
      beforeEach(() => {
        id = 2;
      });

      it('should throw "entity not found"', () => {
        const user = { fake: 'user-1-updated' } as unknown as UserEdit;

        const result = () => service.update(id, user);

        expect(result).toThrow(EntityNotFoundException);
      });
    });
  });

  describe('#delete', () => {
    let id: number;

    describe('with existing user', () => {
      beforeEach(() => {
        id = 1;
      });

      it('should delete user', () => {

        service.delete(id);
        const resultData = service.findAll();

        expect(resultData).toEqual([]);
      });
    });

    describe('with non-existent user', () => {
      beforeEach(() => {
        id = 2;
      });

      it('should throw "entity not found"', () => {

        const result = () => service.delete(id);

        expect(result).toThrow(EntityNotFoundException);
      });
    });
  });
});
