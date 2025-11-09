import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-create-dialog',
  template: '<ng-content></ng-content>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { mock: 'mock' },
})
export class UseCreateDialog {}
