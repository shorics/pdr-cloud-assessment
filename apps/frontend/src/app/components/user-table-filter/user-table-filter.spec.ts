import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputHarness } from '@angular/material/input/testing';

import { UserTableFilter } from './user-table-filter';

@Component({
  template: `<app-user-table-filter (filterChanged)="onFilterChanged($event)"></app-user-table-filter>`,
  imports: [UserTableFilter],
})
class TestHost {
  onFilterChanged = vi.fn();
}

describe('UserTableFilter', () => {
  let component: TestHost;
  let fixture: ComponentFixture<TestHost>;

  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    component = fixture.componentInstance;

    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  describe('with input changed', () => {
    beforeEach(async () => {
      const input = await loader.getHarness(MatInputHarness);

      await input.setValue('test-value');
    });

    it('should emit filter value', () => {

      expect(component.onFilterChanged).toHaveBeenCalledTimes(11);
      expect(component.onFilterChanged).toHaveBeenLastCalledWith('test-value');
    });
  });
});
