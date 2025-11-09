import { AbstractControl, isFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { flattenError, ZodType } from 'zod';

export function zodValidator(schema: ZodType<unknown, unknown>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = schema.safeParse(control.value);

    if (!isFormGroup(control)) {
      return result.success ? null : { zodError: result.error.issues[0].message };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorMap = result.success ? {} : flattenError<any>(result.error).fieldErrors;

    for (const [name, subControl] of Object.entries(control.controls)) {
      const message = errorMap[name]?.[0];
      const errors = { ...subControl.errors };

      if (message) {
        subControl.setErrors({ ...errors, zodError: message });
      } else {
        delete errors?.['zodError'];

        subControl.setErrors({ ...errors });
        subControl.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      }
    }

    return result.success ? null : { zodError: true };
  };
}
