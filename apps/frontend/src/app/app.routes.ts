import { Route } from '@angular/router';
import { UsersService } from './services/users.service';
import { UsersComponent } from './views/users/users.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: UsersComponent,
    providers: [UsersService],
  }
];
