import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { injectDispatch } from '@ngrx/signals/events';
import { User, UserEdit } from '@pdr-cloud-assessment/shared';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UseCreateDialog } from '../../components/user-create-dialog/user-create-dialog';
import { UserDetailsDialog, UserDetailsDialogData } from '../../components/user-details-dialog/user-details-dialog';
import { UserTableFilter } from '../../components/user-table-filter/user-table-filter';
import { UserTable } from '../../components/user-table/user-table';
import { LoadingState } from '../../enums/loading-state.enum';
import { userEvents } from '../../state/user.events';
import { UserStore } from '../../state/user.store';

const PAGE_SIZE = 25;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
  imports: [MatButtonModule, MatPaginatorModule, UserTable, UserTableFilter],
  providers: [UserStore],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserList {
  protected readonly PAGE_SIZE = PAGE_SIZE;

  private readonly dialog = inject(MatDialog);
  private readonly dispatch = injectDispatch(userEvents);
  private readonly snackBar = inject(MatSnackBar);
  private readonly store = inject(UserStore);

  protected readonly filter = signal<string | undefined>(undefined);
  protected readonly pageIndex = signal<number>(0);

  protected readonly user = this.store.user;
  protected readonly userCreate = this.store.userCreate;
  protected readonly userList = this.store.userList;
  protected readonly userListFiltered = computed(
    () => this.filterUserList(this.userList().data, this.filter())
  );
  protected readonly userListFilteredPaginated = computed(
    () => this.paginateUserList(this.userListFiltered(), this.pageIndex())
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

    effect(() => {
      this.filter();
      this.pageIndex.set(0);
    });

    effect(() => {
      const userCreate = this.userCreate();
      const { error, state } = userCreate;

      if (LoadingState.Error === state) {
        this.openSnackBar(error ?? 'error');
      } else if (LoadingState.Done === state) {
        this.openSnackBar('saved');
      }
    })
  }

  protected onFilterChange(value: string | undefined): void {
    this.filter.set(value);
  }

  protected onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
  }

  protected onUserCreateClick(): void {
    const dialogRef = this.dialog.open<UseCreateDialog, unknown, UserEdit>(UseCreateDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.dispatch.createUser(result);
      }
    });
  }

  protected onUserSelect(id: User['id']): void {
    this.dispatch.loadUser(id);
  }

  private filterUserList(userList: User[] | undefined, filter: string | undefined): User[] | undefined {
    const filterLower = filter?.toLowerCase();

    if (!filterLower) {
      return userList;
    }

    return userList?.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;

      return -1 !== fullName.toLowerCase().indexOf(filterLower);
    });
  }

  private paginateUserList(userList: User[] | undefined, pageIndex: number): User[] | undefined {
    const startIndex = pageIndex * this.PAGE_SIZE;
    const endIndex = startIndex + this.PAGE_SIZE;

    return userList?.slice(startIndex, endIndex);
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, undefined, { duration: 3000 });
  }
}
