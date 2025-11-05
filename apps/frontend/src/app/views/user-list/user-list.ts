import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { injectDispatch } from '@ngrx/signals/events';
import { User } from '@pdr-cloud-assessment/shared';

import { UserDetailsDialog, UserDetailsDialogData } from '../../components/user-details-dialog/user-details-dialog';
import { UserTable } from '../../components/user-table/user-table';
import { userEvents } from '../../state/user.events';
import { UserStore } from '../../state/user.store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
  imports: [UserTable],
  providers: [UserStore],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  private readonly dialog = inject(MatDialog);
  private readonly dispatch = injectDispatch(userEvents);
  private readonly store = inject(UserStore);

  protected user = this.store.user;
  protected userList = this.store.userList;

  constructor() {
    this.dispatch.loadUserList();

    effect(() => {
      if (this.user().data) {
        this.dialog.open(UserDetailsDialog, {
            data: { user: this.user().data } as UserDetailsDialogData,
        });
      }
    });
  }

  onUserSelect(id: User['id']): void {
    this.dispatch.loadUser(id);
  }
}
