import { BaseException, EntityNotFoundException, JsonParseInvalidException, JsonParseNotAnArrayException } from './data.exceptions';

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

  describe('JsonParseInvalidException', () => {
    let exception: JsonParseInvalidException;

    beforeEach(() => {
      exception = new JsonParseInvalidException('test-file');
    });

    it('should set file', () => {

      expect(exception.file).toBe('test-file');
    });

    it('should set message', () => {

      expect(exception.message).toBe('File "test-file" is not valid JSON');
    });

    it('should set name', () => {

      expect(exception.name).toBe('JsonParseInvalidException');
    });
  });

  describe('JsonParseNotAnArrayException', () => {
    let exception: JsonParseNotAnArrayException;

    beforeEach(() => {
      exception = new JsonParseNotAnArrayException('test-file');
    });

    it('should set file', () => {

      expect(exception.file).toBe('test-file');
    });

    it('should set message', () => {

      expect(exception.message).toBe('File "test-file" does not contain a JSON array');
    });

    it('should set name', () => {

      expect(exception.name).toBe('JsonParseNotAnArrayException');
    });
  });
});
