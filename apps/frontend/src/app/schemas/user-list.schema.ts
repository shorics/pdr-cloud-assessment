import { UserSchema } from '@pdr-cloud-assessment/shared';
import { array } from 'zod';

export const UserListSchema = array(UserSchema);
