import { BadRequestException } from '@nestjs/common';
import { ZodType } from 'zod';

import { ZodValidationPipe } from './users.pipes';

describe('users pipes', () => {
  describe('ZodValidationPipe', () => {
    let pipe: ZodValidationPipe;

    const schemaMock = {
      parse: jest.fn().mockReturnValue('fake-transform')
    } as jest.MockedObject<ZodType>;

    beforeEach(() => {
      pipe = new ZodValidationPipe(schemaMock);
    });

    it('should parse', () => {
      const value = 'test-value';

      const result = pipe.transform(value);

      expect(schemaMock.parse).toHaveBeenCalledTimes(1);
      expect(schemaMock.parse).toHaveBeenCalledWith('test-value');
      expect(result).toBe('fake-transform');
    });

    describe('with failed parsing', () => {
      beforeEach(() => {
        schemaMock.parse.mockImplementationOnce(() => {
          throw new Error();
        });
      });

      it('should throw bad request exception', () => {
        const value = 'test-value';

        const result = () => pipe.transform(value);

        expect(result).toThrow(BadRequestException);
      });
    });
  });
});
