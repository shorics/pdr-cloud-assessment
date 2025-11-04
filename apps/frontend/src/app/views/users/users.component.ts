import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectDispatch } from '@ngrx/signals/events';

import { usersEvents } from '../../state/users.events';
import { UsersStore } from '../../state/users.store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [JsonPipe],
  providers: [UsersStore],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private readonly dispatch = injectDispatch(usersEvents);
  private readonly store = inject(UsersStore);

  protected users = this.store.users;

  constructor() {
    this.dispatch.loadUsers();
  }
}
