import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { User } from '@pdr-cloud-assessment/shared';

export const usersEvents = eventGroup({
  source: 'Users',
  events: {
    loadUsers: type<void>(),
    loadUsersSuccess: type<User[]>(),
    loadUsersFailure: type<string>(),
  },
});
