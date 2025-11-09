import { discriminatedUnion, email, iso, literal, number, object, preprocess, string, infer as zInfer } from 'zod';

const emptyStringToUndefined = (value: string | undefined): string | undefined => '' === value ? undefined : value;
const nullishToEmptyString = (value: unknown): unknown | '' => value ?? '';

const BaseUserSchema = object({
  id: number('ID must be number')
    .int('ID must be integer')
    .positive('ID must be positive'),
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
      .optional()
    ),
  birthDate: preprocess(
    emptyStringToUndefined,
    iso.date('Date of birth format is invalid').optional(),
  ),
});

const AdminUserSchema = object({
  phoneNumber: BaseUserSchema.shape.phoneNumber.nonoptional('Phone number is required'),
  birthDate: BaseUserSchema.shape.birthDate.nonoptional('Date of birth is required'),
  role: literal('admin'),
});

const EditorUserSchema = object({
  phoneNumber: BaseUserSchema.shape.phoneNumber.nonoptional('Phone number is required'),
  role: literal('editor'),
});

const ViewerUserSchema = object({
  role: literal('viewer'),
});

const RoleUnion = discriminatedUnion('role', [
  AdminUserSchema,
  EditorUserSchema,
  ViewerUserSchema,
], { error: 'Role is invalid' });

export const UserSchema = RoleUnion.and(BaseUserSchema);
export const UserEditSchema = RoleUnion.and(BaseUserSchema.omit({ id: true }))
  .transform((o) => ({
    ...o,
    phoneNumber: emptyStringToUndefined(o.phoneNumber),
    birthDate: emptyStringToUndefined(o.birthDate),
  }));


export type User = zInfer<typeof UserSchema>;
export type UserEdit = zInfer<typeof UserEditSchema>;
