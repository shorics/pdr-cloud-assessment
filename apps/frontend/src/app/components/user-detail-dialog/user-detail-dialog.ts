import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '@pdr-cloud-assessment/shared';

export interface UserDetailDialogData {
  user: User;
};

@Component({
  selector: 'app-user-table',
  templateUrl: './user-detail-dialog.html',
  styleUrl: './user-detail-dialog.scss',
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailDialog {
  private readonly dialogRef = inject(MatDialogRef<UserDetailDialog>);
  private readonly data = inject<UserDetailDialogData>(MAT_DIALOG_DATA);

  protected readonly user = signal(this.data.user);

  protected onCloseClick(): void {
    this.dialogRef.close();
  }
}
