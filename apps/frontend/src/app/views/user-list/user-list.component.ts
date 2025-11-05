import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { injectDispatch } from '@ngrx/signals/events';
import { User } from '@pdr-cloud-assessment/shared';

import { UserDetailDialogComponent, UserDetailDialogData } from '../../components/user-detail-dialog/user-detail-dialog.component';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { userEvents } from '../../state/user.events';
import { UserStore } from '../../state/user.store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  imports: [UserTableComponent],
  providers: [UserStore],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private readonly dialog = inject(MatDialog);
  private readonly dispatch = injectDispatch(userEvents);
  private readonly store = inject(UserStore);

  protected user = this.store.user;
  protected userList = this.store.userList;

  constructor() {
    this.dispatch.loadUserList();

    effect(() => {
      if (this.user().data) {
        this.dialog.open(UserDetailDialogComponent, {
            data: { user: this.user().data } as UserDetailDialogData,
        });
      }
    });
  }

  onUserSelect(id: User['id']): void {
    this.dispatch.loadUser(id);
  }
}
