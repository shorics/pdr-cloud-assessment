import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { User, UserEdit } from '@pdr-cloud-assessment/shared';

export const userEvents = eventGroup({
  source: 'User',
  events: {
    loadUser: type<User['id']>(),
    loadUserSuccess: type<User>(),
    loadUserFailure: type<string>(),

    loadUserList: type<void>(),
    loadUserListSuccess: type<User[]>(),
    loadUserListFailure: type<string>(),

    createUser: type<UserEdit>(),
    createUserSuccess: type<User>(),
    createUserFailure: type<string>(),

    setUserFilter: type<string | undefined>(),
    setUserPageIndex: type<number>(),
  },
});
