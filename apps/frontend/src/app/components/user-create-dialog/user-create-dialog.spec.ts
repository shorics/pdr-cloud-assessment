import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { UserEditSchema as _UserEditSchema } from '@pdr-cloud-assessment/shared';
import { Mock, MockedObject } from 'vitest';

import { MATERIAL_ANIMATIONS } from '@angular/material/core';
import { UseCreateDialog } from './user-create-dialog';

const mocks = vi.hoisted(() => ({
  zodValidatorInnerMock: vi.fn().mockReturnValue(null),
}));

vi.mock('../../validators/zod.validator', () => ({
  zodValidator: () => mocks.zodValidatorInnerMock,
}));

vi.mock('@pdr-cloud-assessment/shared', () => ({
  UserEditSchema:{
    parse: vi.fn().mockReturnValue('fake-user'),
  },
}));

const UserEditSchemaParseMock = _UserEditSchema.parse as unknown as Mock;

@Component({
  template: `<app-user-create-dialog></app-user-create-dialog>`,
  imports: [UseCreateDialog],
})
class TestHost {}

describe('UserTableFilter', () => {
  let component: TestHost;
  let fixture: ComponentFixture<TestHost>;

  let dialogRefMock: MockedObject<MatDialogRef<UseCreateDialog>>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
      providers: [{provide: MATERIAL_ANIMATIONS, useValue: {animationsDisabled: true}}],
    })
    .overrideComponent(UseCreateDialog, {
      add: {
        providers: [
          {
            provide: MatDialogRef,
            useValue: {
              close: vi.fn(),
            },
          },
        ],
      },
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHost);
    component = fixture.componentInstance;

    dialogRefMock = fixture.debugElement.query(By.directive(UseCreateDialog)).injector
      .get(MatDialogRef) as MockedObject<MatDialogRef<UseCreateDialog>>;

      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.loader(fixture);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should render first name field', async () => {

      const result = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'firstName' }));

      expect(result).toBeTruthy();
  });

  it('should render last name field', async () => {

      const result = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'lastName' }));

      expect(result).toBeTruthy();
  });

  it('should render last name field', async () => {

      const result = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'lastName' }));

      expect(result).toBeTruthy();
  });

  it('should render email field', async () => {

      const result = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'email' }));

      expect(result).toBeTruthy();
  });

  it('should render phoneNumber field', async () => {

      const result = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'phoneNumber' }));

      expect(result).toBeTruthy();
  });

  it('should render birthDate field', async () => {

      const result = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'birthDate' }));

      expect(result).toBeTruthy();
  });

  it('should render role field', async () => {

      const result = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'role' }));

      expect(result).toBeTruthy();
  });

  describe('with close button clicked', () => {
    beforeEach(async () => {
      const button = await loader.getHarness(MatButtonHarness.with({ buttonType: 'button' }));

      await button.click();
    });

    it('should close dialog', () => {

      expect(dialogRefMock.close).toHaveBeenCalledOnce();
      expect(dialogRefMock.close).toHaveBeenCalledWith();
    });
  });

  describe('with data', () => {
    beforeEach(async () => {
      const firstName = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'firstName' }));
      await ((await firstName.getControl()) as MatInputHarness)?.setValue('test-first-name');

      const lastName = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'lastName' }));
      await ((await lastName.getControl()) as MatInputHarness)?.setValue('test-last-name');

      const email = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'email' }));
      await ((await email.getControl()) as MatInputHarness)?.setValue('test-email');

      const phoneNumber = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'phoneNumber' }));
      await ((await phoneNumber.getControl()) as MatInputHarness)?.setValue('test-phone-number');

      const birthDate = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'birthDate' }));
      await ((await birthDate.getControl()) as MatInputHarness)?.setValue('test-birth-date');

      // FIXME: Not working. Even the example component is throwing errors. Vitest/jsdom problem?
      // const role = await loader.getHarness(MatFormFieldHarness.with({ floatingLabelText: 'role' }));
      // const roleControl = await (await role.getControl() as MatSelectHarness);
      // await roleControl.open();
      // await roleControl.clickOptions({ text: 'viewer' });
    });

    describe('with submit button clicked', () => {
      beforeEach(async () => {
        const button = await loader.getHarness(MatButtonHarness.with({ buttonType: 'submit' }));

        await button.click();
      });

      it('should parse form data', () => {

        expect(UserEditSchemaParseMock).toHaveBeenCalledOnce();
        expect(UserEditSchemaParseMock).toHaveBeenCalledWith({
          firstName: 'test-first-name',
          lastName: 'test-last-name',
          email: 'test-email',
          phoneNumber: 'test-phone-number',
          birthDate: 'test-birth-date',
          role: 'admin',
        });
      });

      it('should close dialog and return data', () => {

        expect(dialogRefMock.close).toHaveBeenCalledOnce();
        expect(dialogRefMock.close).toHaveBeenCalledWith('fake-user');
      });
    });
  });

  describe('with form invalid', () => {
    beforeEach(async () => {
      mocks.zodValidatorInnerMock.mockReturnValue({ fakeError: 'fakeMessage' });
    });

    describe('with submit button clicked', () => {
      beforeEach(async () => {
        const button = await loader.getHarness(MatButtonHarness.with({ buttonType: 'submit' }));

        await button.click();
      });

      it('should not parse form data', () => {

        expect(UserEditSchemaParseMock).not.toHaveBeenCalledOnce();
      });

      it('should not close dialog', () => {

        expect(dialogRefMock.close).not.toHaveBeenCalledOnce();
      });
    });
  });
});
