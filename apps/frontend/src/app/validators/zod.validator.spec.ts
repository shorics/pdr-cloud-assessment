import { ValidatorFn } from '@angular/forms';
import { MockedObject } from 'vitest';
import { ZodType } from 'zod';

import { zodValidator } from './zod.validator';

describe('zodValidator', () => {
  let validator: ValidatorFn;
  let mockSchema: MockedObject<ZodType>;

  beforeEach(() => {
    mockSchema = {
      safeParse: vi.fn(),
    } as MockedObject<ZodType>;

    validator = zodValidator(mockSchema);
  });

  it('should create', () => {

    expect(validator).toBeTruthy();
  });
});
