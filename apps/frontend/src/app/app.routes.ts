import { Route } from '@angular/router';

import { userListResolver } from './resolvers/load-user-list.resolver';
import { UserService } from './services/user.service';
import { UserListComponent } from './views/user-list/user-list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    providers: [UserService],
    resolve: { userListResolver },
    component: UserListComponent,
  },
];
