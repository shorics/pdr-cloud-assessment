import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-user-table-filter',
  template: '<ng-content></ng-content>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { mock: 'mock' },
})
export class UserTableFilterMock {
  readonly filterChanged = output<string | undefined>();
}
