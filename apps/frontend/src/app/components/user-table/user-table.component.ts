import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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

  protected readonly displayedColumns: string[] = ['id', 'fullName', 'email', 'role'];
}
