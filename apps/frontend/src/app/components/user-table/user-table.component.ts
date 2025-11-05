import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { User } from '@pdr-cloud-assessment/shared';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  imports: [MatTableModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  readonly userList = input.required<User[]>();

  readonly userSelected = output<User['id']>();

  protected readonly displayedColumns: string[] = ['id', 'fullName', 'email', 'role'];

  protected onRowClick(user: User): void {
    this.userSelected.emit(user.id);
  }
}
