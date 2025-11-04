import { signalStore, withState } from '@ngrx/signals';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { User } from '@pdr-cloud-assessment/shared';

import { inject } from '@angular/core';
import { mapResponse } from '@ngrx/operators';
import { switchMap } from 'rxjs';
import { UsersService } from '../services/users.service';
import { usersEvents } from './users.events';

export type UsersState = {
  users: User[];
};

export const initialState: UsersState = {
  users: [],
};

export const UsersStore = signalStore(
  withState(initialState),
  withReducer(
    on(usersEvents.loadUsers, () => ({ users: [] })),
    on(usersEvents.loadUsersSuccess, ({ payload: users }) => ({ users })),
  ),
  withEffects(
    (_, events = inject(Events), service = inject(UsersService)) => ({
      loadUsers$: events
        .on(usersEvents.loadUsers)
        .pipe(
          switchMap(() =>
            service.loadUsers().pipe(
              mapResponse({
                next: (users) => usersEvents.loadUsersSuccess(users),
                error: (error: { message: string }) => usersEvents.loadUsersFailure(error.message),
              }),
            ),
          ),
        )
    }),
  ),
);
