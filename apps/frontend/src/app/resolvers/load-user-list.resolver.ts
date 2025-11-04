import { ResolveFn } from '@angular/router';
import { injectDispatch } from '@ngrx/signals/events';

import { userEvents } from '../state/user.events';

export const userListResolver: ResolveFn<void> = () => {
  const dispatch = injectDispatch(userEvents);

  // FIXME: Why isn't this working without deferring?
  setTimeout(() => dispatch.loadUserList());
};
