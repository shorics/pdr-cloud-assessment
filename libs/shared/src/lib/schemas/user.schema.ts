import parsePhoneNumber from 'libphonenumber-js';
import { custom, email, iso, number, object, preprocess, string, enum as zEnum, infer as zInfer } from 'zod';

const emptyStringToUndefined = (value: string | undefined): string | undefined => '' === value ? undefined : value;
const nullishToEmptyString = (value: unknown): unknown | '' => value ?? '';

const phoneNumber = (error = '') => custom<string>((value) => {
  if (typeof value === 'string') {
    return !!parsePhoneNumber(value, 'US');
  }

  return false;
}, error);

const BaseUserSchema = object({
  firstName: preprocess(
    nullishToEmptyString,
    string('First name must be string').trim()
      .nonempty('First name is required'),
  ),
  lastName: preprocess(
    nullishToEmptyString,
    string('Last name must be string').trim()
      .nonempty('Last name is required'),
  ),
  email: email('Email format is invalid'),
  phoneNumber: preprocess(
    emptyStringToUndefined,
    string('Phone number must be string').trim()
      .nonempty('Phone number is required')
      .and(phoneNumber('Phone number format is invalid'))
      .optional()
    ),
  birthDate: preprocess(
    emptyStringToUndefined,
    iso.date('Date of birth format is invalid').optional(),
  ),
  role: zEnum(['admin', 'editor', 'viewer'], { error: 'Role is invalid' }),
})
.superRefine((val, ctx) => {
  if ('admin' === val.role || 'editor' === val.role) {
    if (undefined === val.phoneNumber) {
      ctx.addIssue({
        code: 'invalid_type',
        expected: 'nonoptional',
        message: 'Phone number is required',
        path: ['phoneNumber'],
        input: val,
      });
    }
  }

  if ('admin' === val.role) {
    if (undefined === val.birthDate) {
      ctx.addIssue({
        code: 'invalid_type',
        expected: 'nonoptional',
        message: 'Date of birth is required',
        path: ['birthDate'],
        input: val,
      });
    }
  }
});

export const UserSchema = BaseUserSchema.and(object({
  id: number('ID must be number')
    .int('ID must be integer')
    .positive('ID must be positive'),
}));
export const UserEditSchema = BaseUserSchema.transform((o) => ({
  ...o,
  phoneNumber: emptyStringToUndefined(o.phoneNumber),
  birthDate: emptyStringToUndefined(o.birthDate),
}));

export type User = zInfer<typeof UserSchema>;
export type UserEdit = zInfer<typeof UserEditSchema>;
