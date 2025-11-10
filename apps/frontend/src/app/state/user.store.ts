import { computed, inject } from '@angular/core';
import { mapResponse } from '@ngrx/operators';
import { signalStore, withComputed, withState } from '@ngrx/signals';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { User } from '@pdr-cloud-assessment/shared';
import { map, switchMap } from 'rxjs';

import { PAGE_SIZE } from '../app.constants';
import { LoadingState } from '../enums/loading-state.enum';
import { Loadable } from '../interfaces/loadable.interface';
import { UserService } from '../services/user.service';
import { userEvents } from './user.events';

export type UserState = {
  user: Loadable<User>;
  userList: Loadable<User[]>;
  userCreate: Loadable<User>;
  userFilter: string | undefined;
  userPageIndex: number;
};

export const initialState: UserState = {
  user: { state: LoadingState.Initial, data: undefined },
  userList: { state: LoadingState.Initial, data: [] },
  userCreate: { state: LoadingState.Initial, data: undefined },
  userFilter: undefined,
  userPageIndex: 0,
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

    on(userEvents.createUser, () => ({ userCreate: { state: LoadingState.Loading, data: undefined } })),
    on(userEvents.createUserSuccess, ({ payload: user }) => ({ userCreate: { state: LoadingState.Done, data: user } })),
    on(userEvents.createUserFailure, ({ payload: error }) => ({ userCreate: { state: LoadingState.Error, data: undefined, error } })),

    on(userEvents.setUserFilter, ({ payload: userFilter }) => ({ userFilter })),
    on(userEvents.setUserPageIndex, ({ payload: userPageIndex }) => ({ userPageIndex })),
  ),
  withComputed(({ userList, userFilter }) => ({
    userListFiltered: computed(() => {
      const list = userList().data;
      const filterLower = userFilter()?.toLowerCase();

      if (!filterLower || !list) {
        return list;
      }

      return list?.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`;

        return -1 !== fullName.toLowerCase().indexOf(filterLower);
      });
    }),
  })),
  withComputed(({ userListFiltered, userPageIndex }) => ({
    userListFilteredPaginated: computed(() => {
      const list = userListFiltered();
      const pageIndex = userPageIndex();
      const startIndex = pageIndex * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;

      return list?.slice(startIndex, endIndex);
    }),
  })),
  withComputed(({ userListFiltered }) => ({
    userListLength: computed(() => userListFiltered()?.length ?? 0),
  })),
  withEffects(
    (_, events = inject(Events), service = inject(UserService)) => ({
      loadUser$: events
        .on(userEvents.loadUser)
        .pipe(
          switchMap(({ payload: id }) =>
            service.loadUser(id).pipe(
              mapResponse({
                next: (user) => userEvents.loadUserSuccess(user),
                error: (error: Error) => userEvents.loadUserFailure(error.message),
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
                error: (error: Error) => userEvents.loadUserListFailure(error.message),
              }),
            ),
          ),
        ),

      createUser$: events
        .on(userEvents.createUser)
        .pipe(
          switchMap(({ payload: user }) =>
            service.createUser(user).pipe(
              mapResponse({
                next: (user) => userEvents.createUserSuccess(user),
                error: (error: Error) => userEvents.createUserFailure(error.message),
              }),
            ),
          ),
        ),

      createUserSuccess$: events
        .on(userEvents.createUserSuccess)
        .pipe(
          map(() => userEvents.loadUserList()),
        ),

      setUserFilter$: events
        .on(userEvents.setUserFilter)
        .pipe(
          map(() => userEvents.setUserPageIndex(0)),
        ),
    }),
  ),
);
