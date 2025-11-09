import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserEdit, UserEditSchema } from '@pdr-cloud-assessment/shared';

import { zodValidator } from '../../validators/zod.validator';

@Component({
  selector: 'app-user-create-dialog',
  templateUrl: './user-create-dialog.html',
  styleUrl: './user-create-dialog.scss',
  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UseCreateDialog {
  private readonly dialogRef = inject(MatDialogRef<UseCreateDialog>);

  protected readonly userForm = new FormGroup({
    firstName: new FormControl<UserEdit['firstName']>(''),
    lastName: new FormControl<UserEdit['lastName']>(''),
    email: new FormControl<UserEdit['email']>(''),
    phoneNumber: new FormControl<UserEdit['phoneNumber']>(''),
    birthDate: new FormControl<UserEdit['birthDate']>(''),
    role: new FormControl<UserEdit['role']>('admin'),
  }, { validators: zodValidator(UserEditSchema) });

  protected onSubmit(): void {
    this.userForm.updateValueAndValidity({ emitEvent: false });

    if (this.userForm.invalid) {
      return;
    }

    const user = UserEditSchema.parse(this.userForm.value);

    this.dialogRef.close(user);
  }

  protected onCloseClick(): void {
    this.dialogRef.close();
  }
}
