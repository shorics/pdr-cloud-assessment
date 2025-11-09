import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { User } from '@pdr-cloud-assessment/shared';

@Component({
  selector: 'app-user-table',
  template: '<ng-content></ng-content>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { mock: 'mock' },
})
export class UserTableMock {
  readonly userList = input.required<User[]>();

  readonly userSelected = output<User['id']>();
}
