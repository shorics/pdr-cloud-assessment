import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { injectDispatch } from '@ngrx/signals/events';
import { User, UserEdit } from '@pdr-cloud-assessment/shared';

import { PAGE_SIZE } from '../../app.constants';
import { UseCreateDialog } from '../../components/user-create-dialog/user-create-dialog';
import { UserDetailsDialog, UserDetailsDialogData } from '../../components/user-details-dialog/user-details-dialog';
import { UserTableFilter } from '../../components/user-table-filter/user-table-filter';
import { UserTable } from '../../components/user-table/user-table';
import { LoadingState } from '../../enums/loading-state.enum';
import { userEvents } from '../../state/user.events';
import { UserStore } from '../../state/user.store';

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

  protected readonly user = this.store.user;
  protected readonly userCreate = this.store.userCreate;
  protected readonly userList = this.store.userListFilteredPaginated;
  protected readonly userPageIndex = this.store.userPageIndex;
  protected readonly userListLength = this.store.userListLength;

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
      const userCreate = this.userCreate();
      const { error, state } = userCreate;

      if (LoadingState.Error === state) {
        this.openSnackBar(error ?? 'Error');
      } else if (LoadingState.Done === state) {
        this.openSnackBar('Saved');
      }
    });
  }

  protected onFilterChange(value: string | undefined): void {
    this.dispatch.setUserFilter(value);
  }

  protected onPageChange(event: PageEvent) {
    this.dispatch.setUserPageIndex(event.pageIndex);
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

  private openSnackBar(message: string): void {
    this.snackBar.open(message, undefined, { duration: 3000 });
  }
}
