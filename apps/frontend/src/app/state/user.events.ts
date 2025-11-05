import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { User } from '@pdr-cloud-assessment/shared';

export const userEvents = eventGroup({
  source: 'User',
  events: {
    loadUserList: type<void>(),
    loadUserListSuccess: type<User[]>(),
    loadUserListFailure: type<string>(),

    loadUser: type<User['id']>(),
    loadUserSuccess: type<User>(),
    loadUserFailure: type<string>(),
  },
});
