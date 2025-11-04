import { signalStore, withState } from '@ngrx/signals';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { User } from '@pdr-cloud-assessment/shared';

import { inject } from '@angular/core';
import { mapResponse } from '@ngrx/operators';
import { switchMap } from 'rxjs';

import { Loadable, LoadingState } from '../interfaces/loadable.interface';
import { UsersService } from '../services/users.service';
import { usersEvents } from './users.events';

export type UsersState = {
  users: Loadable<User[]>;
};

export const initialState: UsersState = {
  users: { state: LoadingState.Initial, data: [] },
};

export const UsersStore = signalStore(
  withState(initialState),
  withReducer(
    on(usersEvents.loadUsers, (_, state) => ({ users: { ...state.users, state: LoadingState.Loading } })),
    on(usersEvents.loadUsersSuccess, ({ payload: users }) => ({ users: { state: LoadingState.Done, data: users } })),
    on(usersEvents.loadUsersFailure, ({ payload: error }) => ({ users: { state: LoadingState.Error, data: undefined, error } })),
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
