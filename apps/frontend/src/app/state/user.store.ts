import { inject } from '@angular/core';
import { mapResponse } from '@ngrx/operators';
import { signalStore, withState } from '@ngrx/signals';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { User } from '@pdr-cloud-assessment/shared';
import { switchMap } from 'rxjs';

import { LoadingState } from '../enums/loading-state.enum';
import { Loadable } from '../interfaces/loadable.interface';
import { UserService } from '../services/user.service';
import { userEvents } from './user.events';

export type UserState = {
  user: Loadable<User>;
  userList: Loadable<User[]>;
};

export const initialState: UserState = {
  user: { state: LoadingState.Initial, data: undefined },
  userList: { state: LoadingState.Initial, data: [] },
};

export const UserStore = signalStore(
  withState(initialState),
  withReducer(
    on(userEvents.loadUser, () => ({ user: { state: LoadingState.Loading, data: undefined } })),
    on(userEvents.loadUserSuccess, ({ payload: user }) => ({ user: { state: LoadingState.Done, data: user } })),
    on(userEvents.loadUserFailure, ({ payload: error }) => ({ user: { state: LoadingState.Error, data: undefined, error } })),

    on(userEvents.loadUserList, (_, state) => ({ userList: { ...state.userList, state: LoadingState.Loading } })),
    on(userEvents.loadUserListSuccess, ({ payload: userList }) => ({ userList: { state: LoadingState.Done, data: userList } })),
    on(userEvents.loadUserListFailure, ({ payload: error }) => ({ userList: { state: LoadingState.Error, data: undefined, error } })),
  ),
  withEffects(
    (_, events = inject(Events), service = inject(UserService)) => ({
      loadUser$: events
        .on(userEvents.loadUser)
        .pipe(
          switchMap(({ payload: id }) =>
            service.loadUser(id).pipe(
              mapResponse({
                next: (user) => userEvents.loadUserSuccess(user),
                error: (error: { message: string }) => userEvents.loadUserFailure(error.message),
              }),
            ),
          ),
        ),

      loadUserList$: events
        .on(userEvents.loadUserList)
        .pipe(
          switchMap(() =>
            service.loadUserList().pipe(
              mapResponse({
                next: (users) => userEvents.loadUserListSuccess(users),
                error: (error: { message: string }) => userEvents.loadUserListFailure(error.message),
              }),
            ),
          ),
        ),
    }),
  ),
);
