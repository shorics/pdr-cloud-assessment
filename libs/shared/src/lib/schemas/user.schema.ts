import { discriminatedUnion, email, iso, literal, object, preprocess, string, infer as zInfer } from 'zod';

const emptyStringToUndefined = (value: unknown) => '' === value ? undefined : value;

const BaseUserSchema = object({
  // id: number().int().positive(),
  firstName: string('users.error.firstName.string').trim()
    .nonempty('users.error.firstName.required'),
  lastName: string('users.error.lastName.string').trim()
    .nonempty('users.error.lastName.required'),
  email:email('users.error.email.format'),
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

export const UserEditSchema = discriminatedUnion('role', [
  AdminUserSchema,
  EditorUserSchema,
  ViewerUserSchema,
]).and(BaseUserSchema)
  .transform((o) => {
    return {
      ...o,
      phoneNumber: emptyStringToUndefined(o.phoneNumber),
      birthDate: emptyStringToUndefined(o.birthDate),
    }
  });


export type UserEdit = zInfer<typeof UserEditSchema>;
export type User = UserEdit & { id: number };
