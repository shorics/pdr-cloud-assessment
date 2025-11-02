import { discriminatedUnion, literal, number, object, string, infer as zInfer } from 'zod';

const BaseUserSchema = object({
  id: number().int().positive(),
  firstName: string(),
  lastName: string(),
  email:string().email(),
  phoneNumber: string().optional(),
  birthDate: string().date().optional(),
});

const AdminUserSchema = object({
  phoneNumber: string(),
  birthDate: string().date(),
  role: literal('admin'),
});

const EditorUserSchema = object({
  phoneNumber: string(),
  role: literal('editor'),
});

const ViewerUserSchema = object({
  role: literal('viewer'),
});

export const UserSchema = discriminatedUnion('role', [
  AdminUserSchema,
  EditorUserSchema,
  ViewerUserSchema,
])
.and(BaseUserSchema);

export type User = zInfer<typeof UserSchema>;
