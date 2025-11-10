import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MockedObject } from 'vitest';
import { ZodType } from 'zod';

import { zodValidator } from './zod.validator';

const safeParseMock = vi.fn();

describe('zodValidator', () => {
  let validator: ValidatorFn;
  let mockSchema: MockedObject<ZodType>;

  beforeEach(() => {
    mockSchema = { safeParse: safeParseMock } as MockedObject<ZodType>;

    validator = zodValidator(mockSchema);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {

    expect(validator).toBeTruthy();
  });

  describe('with parsing successful', () => {
    beforeEach(() => {
      safeParseMock.mockReturnValue({ success: true });
    });

    it('should return null', () => {

      const result = validator('fake-control' as unknown as AbstractControl);

      expect(result).toBeNull();
    });
  });

  describe('with parsing successful', () => {
    beforeEach(() => {
      safeParseMock.mockReturnValue({ success: false, error: 'fake-error' });
    });

    it('should return error', () => {

      const result = validator('fake-control' as unknown as AbstractControl);

      expect(result).toEqual({ zodError: 'fake-error' });
    });
  });
});
