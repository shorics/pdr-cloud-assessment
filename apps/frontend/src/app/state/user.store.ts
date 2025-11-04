import { signalStore, withState } from '@ngrx/signals';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { User } from '@pdr-cloud-assessment/shared';

import { inject } from '@angular/core';
import { mapResponse } from '@ngrx/operators';
import { switchMap } from 'rxjs';

import { Loadable, LoadingState } from '../interfaces/loadable.interface';
import { UserService } from '../services/user.service';
import { userEvents } from './user.events';

export type UserState = {
  userList: Loadable<User[]>;
};

export const initialState: UserState = {
  userList: { state: LoadingState.Initial, data: [] },
};

export const UserStore = signalStore(
  withState(initialState),
  withReducer(
    on(userEvents.loadUserList, (_, state) => { console.log('test');
     return { userList: { ...state.userList, state: LoadingState.Loading } } }),
    on(userEvents.loadUserListSuccess, ({ payload: userList }) => ({ userList: { state: LoadingState.Done, data: userList } })),
    on(userEvents.loadUserListFailure, ({ payload: error }) => ({ userList: { state: LoadingState.Error, data: undefined, error } })),
  ),
  withEffects(
    (_, events = inject(Events), service = inject(UserService)) => ({
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
