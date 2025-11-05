import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { User } from '@pdr-cloud-assessment/shared';

export interface UserDetailsDialogData {
  user: User;
};

@Component({
  selector: 'app-user-details-dialog',
  templateUrl: './user-details-dialog.html',
  styleUrl: './user-details-dialog.scss',
  imports: [MatButtonModule, MatDialogModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsDialog {
  private readonly dialogRef = inject(MatDialogRef<UserDetailsDialog>);
  private readonly data = inject<UserDetailsDialogData>(MAT_DIALOG_DATA);

  protected readonly user = signal(this.data.user);

  protected onCloseClick(): void {
    this.dialogRef.close();
  }
}
