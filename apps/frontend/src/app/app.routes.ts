import { Route } from '@angular/router';

import { UserService } from './services/user.service';
import { Smiley } from './views/smiley/smiley';
import { UserList } from './views/user-list/user-list';

export const appRoutes: Route[] = [
  {
    path: '',
    providers: [UserService],
    component: UserList,
  },
  {
    path: 'smiley',
    component: Smiley,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
