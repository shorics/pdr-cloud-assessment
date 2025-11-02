import { discriminatedUnion, email, iso, literal, object, string, infer as zInfer } from 'zod';

const BaseUserSchema = object({
  firstName: string('users.error.firstName.string').trim()
    .min(1, 'users.error.firstName.required'),
  lastName: string('users.error.lastName.string').trim()
    .min(1, 'users.error.lastName.required'),
  email:email('users.error.email.format'),
  phoneNumber: string('users.error.phoneNumber.string').trim()
    .min(1, 'users.error.phoneNumber.required')
    .optional(),
  birthDate: iso.date('users.error.birthDate.format').optional(),
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
])
.and(BaseUserSchema);

export type UserEdit = zInfer<typeof UserEditSchema>;
export type User = UserEdit & { id: number };
