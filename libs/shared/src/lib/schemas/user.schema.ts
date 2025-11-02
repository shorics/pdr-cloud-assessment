import { number, object, string, enum as zEnum, infer as zInfer } from 'zod';

export const UserSchema = object({
  id: number().int().positive(),
  firstName: string(),
  lastName: string(),
  email:string().email(),
  phoneNumber: string().optional(),
  birthDate: string().date().optional(),
  role: zEnum(['admin', 'editor', 'viewer']),
});

export type User = zInfer<typeof UserSchema>;
