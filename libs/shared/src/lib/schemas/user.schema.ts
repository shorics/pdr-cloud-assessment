import { discriminatedUnion, email, iso, literal, number, object, preprocess, string, infer as zInfer } from 'zod';

const emptyStringToUndefined = (value: string | undefined): string | undefined => '' === value ? undefined : value;
const nullishToEmptyString = (value: unknown): unknown | '' => value ?? '';

const BaseUserSchema = object({
  id: number('users.error.id.number')
    .int('users.error.id.int')
    .positive('users.error.id.positive'),
  firstName: preprocess(
    nullishToEmptyString,
    string('users.error.firstName.string').trim()
      .nonempty('users.error.firstName.required'),
  ),
  lastName: preprocess(
    nullishToEmptyString,
    string('users.error.lastName.string').trim()
      .nonempty('users.error.lastName.required'),
  ),
  email: email('users.error.email.format'),
  phoneNumber: preprocess(
    emptyStringToUndefined,
    string('users.error.phoneNumber.string').trim()
      .nonempty('users.error.phoneNumber.required')
      .optional()
    ),
  birthDate: preprocess(
    emptyStringToUndefined,
    iso.date('users.error.birthDate.format').optional(),
  ),
});

const AdminUserSchema = object({
  phoneNumber: BaseUserSchema.shape.phoneNumber.nonoptional('users.error.phoneNumber.required'),
  birthDate: BaseUserSchema.shape.birthDate.nonoptional('users.error.birthDate.required'),
  role: literal('admin'),
});

const EditorUserSchema = object({
  phoneNumber: BaseUserSchema.shape.phoneNumber.nonoptional('users.error.phoneNumber.required'),
  role: literal('editor'),
});

const ViewerUserSchema = object({
  role: literal('viewer'),
});

const RoleUnion = discriminatedUnion('role', [
  AdminUserSchema,
  EditorUserSchema,
  ViewerUserSchema,
], { error: 'users.error.role.value' });

export const UserSchema = RoleUnion.and(BaseUserSchema);
export const UserEditSchema = RoleUnion.and(BaseUserSchema.omit({ id: true }))
  .transform((o) => ({
    ...o,
    phoneNumber: emptyStringToUndefined(o.phoneNumber),
    birthDate: emptyStringToUndefined(o.birthDate),
  }));


export type User = zInfer<typeof UserSchema>;
export type UserEdit = zInfer<typeof UserEditSchema>;
