import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectDispatch } from '@ngrx/signals/events';

import { userEvents } from '../../state/user.events';
import { UserStore } from '../../state/user.store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  imports: [JsonPipe],
  providers: [UserStore],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private readonly dispatch = injectDispatch(userEvents);
  private readonly store = inject(UserStore);

  protected user = this.store.user;
  protected userList = this.store.userList;

  constructor() {
    this.dispatch.loadUserList();
    this.dispatch.loadUser(1);
  }
}
