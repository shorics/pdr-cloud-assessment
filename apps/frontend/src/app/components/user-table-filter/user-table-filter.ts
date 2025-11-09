import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-table-filter',
  templateUrl: './user-table-filter.html',
  imports: [MatFormFieldModule, MatInputModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableFilter {
  readonly filterChanged = output<string | undefined>();

  protected onInput(value: string): void {
    this.filterChanged.emit(value || undefined);
  }
}
