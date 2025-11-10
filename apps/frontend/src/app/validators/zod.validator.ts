import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { output, ZodSafeParseResult, ZodType } from 'zod';

export type ZodValidationError<T extends ZodType> = ZodSafeParseResult<output<T>>['error'];

export function zodValidator<T extends ZodType>(schema: T): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = schema.safeParse(control.value);

    return result.success ? null : { zodError: result.error };
  };
}
