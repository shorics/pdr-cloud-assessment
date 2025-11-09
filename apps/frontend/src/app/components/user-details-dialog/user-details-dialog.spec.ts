import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { MockedObject } from 'vitest';

import { UserDetailsDialog } from './user-details-dialog';

@Component({
  template: `<app-user-details-dialog></app-user-details-dialog>`,
  imports: [UserDetailsDialog],
})
class TestHost {}

describe('UserTableFilter', () => {
  let component: TestHost;
  let fixture: ComponentFixture<TestHost>;
  let element: HTMLElement;

  let dialogRefMock: MockedObject<MatDialogRef<UserDetailsDialog>>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    })
    .overrideComponent(UserDetailsDialog, {
      set: {
        providers: [
          {
            provide: MatDialogRef,
            useValue: {
              close: vi.fn(),
            },
          },
        ],
      }
    })
    .compileComponents();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('with user without phone number and birthdate', () => {
    beforeEach(() => {
      TestBed.overrideComponent(UserDetailsDialog, {
        add: {
          providers: [
            {
              provide: MAT_DIALOG_DATA,
              useValue: {
                  user: {
                  firstName: 'fake-first-name',
                  lastName: 'fake-last-name',
                  email: 'fake-email',
                  role: 'fake-role',
                }
              },
            },
          ]
        },
      });

      fixture = TestBed.createComponent(TestHost);
      element = fixture.nativeElement;
      component = fixture.componentInstance;

      dialogRefMock = fixture.debugElement.query(By.directive(UserDetailsDialog)).injector
        .get(MatDialogRef) as MockedObject<MatDialogRef<UserDetailsDialog>>;
      loader = TestbedHarnessEnvironment.loader(fixture);

      fixture.detectChanges();
    });

    it('should create', () => {

      expect(component).toBeTruthy();
    });

    it('should render user', () => {

      expect(element.textContent).toContain('fake-first-name');
      expect(element.textContent).toContain('fake-last-name');
      expect(element.textContent).toContain('fake-email');
      expect(element.textContent).not.toContain('phoneNumber');
      expect(element.textContent).not.toContain('birthDate');
      expect(element.textContent).toContain('fake-role');
    });

    describe('with close button clicked', () => {
      beforeEach(async () => {
        const button = await loader.getHarness(MatButtonHarness);

        await button.click();
      });

      it('should close dialog', () => {

        expect(dialogRefMock.close).toHaveBeenCalledOnce();
      });
    });
  });

  describe('with user without birthdate', () => {
    beforeEach(() => {
      TestBed.overrideComponent(UserDetailsDialog, {
        add: {
          providers: [
            {
              provide: MAT_DIALOG_DATA,
              useValue: {
                  user: {
                  firstName: 'fake-first-name',
                  lastName: 'fake-last-name',
                  email: 'fake-email',
                  phoneNumber: 'fake-phone-number',
                  role: 'fake-role',
                }
              },
            },
          ]
        },
      });

      fixture = TestBed.createComponent(TestHost);
      element = fixture.nativeElement;
      component = fixture.componentInstance;

      dialogRefMock = fixture.debugElement.query(By.directive(UserDetailsDialog)).injector
        .get(MatDialogRef) as MockedObject<MatDialogRef<UserDetailsDialog>>;
      loader = TestbedHarnessEnvironment.loader(fixture);

      fixture.detectChanges();
    });

    it('should create', () => {

      expect(component).toBeTruthy();
    });

    it('should render user', () => {

      expect(element.textContent).toContain('fake-first-name');
      expect(element.textContent).toContain('fake-last-name');
      expect(element.textContent).toContain('fake-email');
      expect(element.textContent).toContain('phoneNumber');
      expect(element.textContent).toContain('fake-phone-number');
      expect(element.textContent).not.toContain('birthDate');
      expect(element.textContent).toContain('fake-role');
    });
  });

  describe('with user without phone number', () => {
    beforeEach(() => {
      TestBed.overrideComponent(UserDetailsDialog, {
        add: {
          providers: [
            {
              provide: MAT_DIALOG_DATA,
              useValue: {
                  user: {
                  firstName: 'fake-first-name',
                  lastName: 'fake-last-name',
                  email: 'fake-email',
                  birthDate: 'fake-birth-date',
                  role: 'fake-role',
                }
              },
            },
          ]
        },
      });

      fixture = TestBed.createComponent(TestHost);
      element = fixture.nativeElement;
      component = fixture.componentInstance;

      dialogRefMock = fixture.debugElement.query(By.directive(UserDetailsDialog)).injector
        .get(MatDialogRef) as MockedObject<MatDialogRef<UserDetailsDialog>>;
      loader = TestbedHarnessEnvironment.loader(fixture);

      fixture.detectChanges();
    });

    it('should create', () => {

      expect(component).toBeTruthy();
    });

    it('should render user', () => {

      expect(element.textContent).toContain('fake-first-name');
      expect(element.textContent).toContain('fake-last-name');
      expect(element.textContent).toContain('fake-email');
      expect(element.textContent).not.toContain('phoneNumber');
      expect(element.textContent).toContain('birthDate');
      expect(element.textContent).toContain('fake-birth-date');
      expect(element.textContent).toContain('fake-role');
    });
  });

  describe('with user with phone number and birthdate', () => {
    beforeEach(() => {
      TestBed.overrideComponent(UserDetailsDialog, {
        add: {
          providers: [
            {
              provide: MAT_DIALOG_DATA,
              useValue: {
                  user: {
                  firstName: 'fake-first-name',
                  lastName: 'fake-last-name',
                  email: 'fake-email',
                  phoneNumber: 'fake-phone-number',
                  birthDate: 'fake-birth-date',
                  role: 'fake-role',
                }
              },
            },
          ]
        },
      });

      fixture = TestBed.createComponent(TestHost);
      element = fixture.nativeElement;
      component = fixture.componentInstance;

      dialogRefMock = fixture.debugElement.query(By.directive(UserDetailsDialog)).injector
        .get(MatDialogRef) as MockedObject<MatDialogRef<UserDetailsDialog>>;
      loader = TestbedHarnessEnvironment.loader(fixture);

      fixture.detectChanges();
    });

    it('should create', () => {

      expect(component).toBeTruthy();
    });

    it('should render user', () => {

      expect(element.textContent).toContain('fake-first-name');
      expect(element.textContent).toContain('fake-last-name');
      expect(element.textContent).toContain('fake-email');
      expect(element.textContent).toContain('phoneNumber');
      expect(element.textContent).toContain('fake-phone-number');
      expect(element.textContent).toContain('birthDate');
      expect(element.textContent).toContain('fake-birth-date');
      expect(element.textContent).toContain('fake-role');
    });
  });
});
