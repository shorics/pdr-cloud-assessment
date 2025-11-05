import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { injectDispatch } from '@ngrx/signals/events';
import { User } from '@pdr-cloud-assessment/shared';

import { UserDetailsDialog, UserDetailsDialogData } from '../../components/user-details-dialog/user-details-dialog';
import { UserTableFilter } from "../../components/user-table-filter/user-table-filter";
import { UserTable } from '../../components/user-table/user-table';
import { userEvents } from '../../state/user.events';
import { UserStore } from '../../state/user.store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
  imports: [UserTable, UserTableFilter],
  providers: [UserStore],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  private readonly dialog = inject(MatDialog);
  private readonly dispatch = injectDispatch(userEvents);
  private readonly store = inject(UserStore);

  protected filter = signal<string | undefined>(undefined);
  protected user = this.store.user;
  protected userList = this.store.userList;
  protected userListFiltered = computed(
    () => this.filterUserList(this.userList().data, this.filter())
  );

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

  protected onFilterChange(value: string | undefined): void {
    this.filter.set(value);
  }

  protected onUserSelect(id: User['id']): void {
    this.dispatch.loadUser(id);
  }

  private filterUserList(userList: User[] | undefined, filter: string | undefined): User[] | undefined {
    if (!filter) {
      return userList;
    }

    const filterLower = filter.toLowerCase();

    return userList?.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;

      return -1 !== fullName.toLowerCase().indexOf(filterLower);
    });
  }
}
