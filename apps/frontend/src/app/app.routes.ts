import { Route } from '@angular/router';

import { UserService } from './services/user.service';
import { UserListComponent } from './views/user-list/user-list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    providers: [UserService],
    component: UserListComponent,
  },
];
