import { BaseException, EntityNotFoundException } from './data.exceptions';

describe('data exceptions', () => {
  describe('BaseException', () => {
    let exception: BaseException;

    beforeEach(() => {
      exception = new BaseException('test-message');
    });

    it('should set message', () => {

      expect(exception.message).toBe('test-message');
    });

    it('should set name', () => {

      expect(exception.name).toBe('BaseException');
    });
  });

  describe('EntityNotFoundException', () => {
    let exception: EntityNotFoundException;

    beforeEach(() => {
      exception = new EntityNotFoundException('test-id');
    });

    it('should set id', () => {

      expect(exception.id).toBe('test-id');
    });

    it('should set message', () => {

      expect(exception.message).toBe('Entity "test-id" not found');
    });

    it('should set name', () => {

      expect(exception.name).toBe('EntityNotFoundException');
    });
  });
});
