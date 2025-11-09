import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { Dispatcher } from '@ngrx/signals/events';
import { UserEdit } from '@pdr-cloud-assessment/shared';
import { of } from 'rxjs';
import { MockedObject } from 'vitest';

import { PAGE_SIZE } from '../../app.constants';
import { UseCreateDialog } from '../../components/user-create-dialog/user-create-dialog';
import { UserDetailsDialog } from '../../components/user-details-dialog/user-details-dialog';
import { UserTableFilter } from '../../components/user-table-filter/user-table-filter';
import { UserTableFilterMock } from '../../components/user-table-filter/user-table-filter.mock';
import { UserTable } from '../../components/user-table/user-table';
import { UserTableMock } from '../../components/user-table/user-table.mock';
import { LoadingState } from '../../enums/loading-state.enum';
import { Loadable } from '../../interfaces/loadable.interface';
import { userEvents } from '../../state/user.events';
import { UserStore } from '../../state/user.store';
import { UserList } from './user-list';

@Component({
  template: `<app-user-list></app-user-list>`,
  imports: [UserList],
})
class TestHost {}

const createMockStore = () => ({
  user: signal<Loadable<unknown>>({ data: undefined, state: LoadingState.Initial }),
  userCreate: signal<Loadable<unknown>>({ data: undefined, state: LoadingState.Initial }),
  userListFilteredPaginated: signal([ { id: 'fake-user-1' } ]),
  userPageIndex: signal(123456789),
  userListLength: signal(987654321),
});

let mockedUserStore: ReturnType<typeof createMockStore>;

describe('UserTableFilter', () => {
  let component: TestHost;
  let fixture: ComponentFixture<TestHost>;

  let dialog: MockedObject<MatDialog>;
  let dispatcher: MockedObject<Dispatcher>;
  let snackBar: MockedObject<MatSnackBar>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    mockedUserStore = createMockStore();

    await TestBed.configureTestingModule({
      imports: [TestHost],
      providers: [
        { provide: Dispatcher, useValue: { dispatch: vi.fn() } },
        {
          provide: MatDialog,
          useValue: {
            open: vi.fn(),
          }
        },
        { provide: MatSnackBar, useValue: { open: vi.fn() } },
      ]
    })
    .overrideComponent(UserList, {
      remove: {
        imports: [UserTable, UserTableFilter],
      },
      add: {
        imports: [UserTableMock, UserTableFilterMock],
      },
    })
    .overrideComponent(UserList, {
      set: {
        providers: [
          {
            provide: UserStore,
            useValue: mockedUserStore,
          },
        ]
      },
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHost);
    component = fixture.componentInstance;

    dialog = TestBed.inject(MatDialog) as MockedObject<MatDialog>;
    dispatcher = TestBed.inject(Dispatcher) as MockedObject<Dispatcher>;
    snackBar = TestBed.inject(MatSnackBar) as MockedObject<MatSnackBar>;

    loader = TestbedHarnessEnvironment.loader(fixture);

    fixture.detectChanges();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should load user list', () => {
    const event = userEvents.loadUserList();

    expect(dispatcher.dispatch).toHaveBeenCalledExactlyOnceWith(event)
  });

  it('should set user list on table', () => {
      const table = fixture.debugElement.query(By.directive(UserTableMock))
        .componentInstance as UserTableMock;

      expect(table.userList()).toEqual([ { id: 'fake-user-1' } ]);
  });

  it('should configure mat paginator', () => {
      const paginator = fixture.debugElement.query(By.directive(MatPaginator))
        .componentInstance as MatPaginator;

      expect(paginator.length).toBe(987654321);
      expect(paginator.pageIndex).toBe(123456789);
      expect(paginator.pageSize).toBe(PAGE_SIZE);
      expect(paginator.hidePageSize).toBe(true);
  });

  describe('with filter changed', () => {
    beforeEach(() => {
      const filter = fixture.debugElement.query(By.directive(UserTableFilterMock))
        .componentInstance as UserTableFilterMock;
      filter.filterChanged.emit('test-filter');
    });

    it('should set filter', () => {
      const event = userEvents.setUserFilter('test-filter');

      expect(dispatcher.dispatch).toHaveBeenCalledTimes(2);
      expect(dispatcher.dispatch).toHaveBeenNthCalledWith(2, event);
    });
  });

  describe('with page changed', () => {
    beforeEach(async () => {
      const paginator = fixture.debugElement.query(By.directive(MatPaginator))
        .componentInstance as MatPaginator;
      paginator.page.emit({ pageIndex: 'fake-page' as unknown as number } as PageEvent);
    });

    it('should set filter', () => {
      const event = userEvents.setUserPageIndex('fake-page' as unknown as number);

      expect(dispatcher.dispatch).toHaveBeenCalledTimes(2);
      expect(dispatcher.dispatch).toHaveBeenNthCalledWith(2, event);
    });
  });

  describe('with user selected', () => {
    beforeEach(async () => {
      const table = fixture.debugElement.query(By.directive(UserTableMock))
        .componentInstance as UserTableMock;
      table.userSelected.emit('fake-id' as unknown as number);

      mockedUserStore.user.set({ data: { id: 'fake-user' }, state: LoadingState.Done });

      fixture.detectChanges();
    });

    it('should load user', () => {
      const event = userEvents.loadUser('fake-id' as unknown as number);

      expect(dispatcher.dispatch).toHaveBeenCalledTimes(2);
      expect(dispatcher.dispatch).toHaveBeenNthCalledWith(2, event);
    });

    it('should open user details dialog', () => {

      expect(dialog.open).toHaveBeenCalledExactlyOnceWith(UserDetailsDialog, {
        data: { user: { id: 'fake-user' } },
      });
    });
  });

  describe('with user saves user', () => {
    beforeEach(async () => {
      dialog.open.mockReturnValue({ afterClosed: () => of('fake-user-create') } as unknown as MatDialogRef<unknown>)
    });

    describe('with user create clicked', () => {
      beforeEach(async () => {
        const button = await loader.getHarness(MatButtonHarness.with({ text: 'Create User' }));

        await button.click();
      });

      it('should open user create dialog', () => {

        expect(dialog.open).toHaveBeenCalledExactlyOnceWith(UseCreateDialog);
      });

      it('should create user', () => {
        const event = userEvents.createUser('fake-user-create' as unknown as UserEdit);

        expect(dispatcher.dispatch).toHaveBeenCalledTimes(2);
        expect(dispatcher.dispatch).toHaveBeenNthCalledWith(2, event);
      });
    });
  });

  describe('with user cancels save user', () => {
    beforeEach(async () => {
      dialog.open.mockReturnValue({ afterClosed: () => of(undefined) } as unknown as MatDialogRef<unknown>)
    });

    describe('with user create clicked', () => {
      beforeEach(async () => {
        const button = await loader.getHarness(MatButtonHarness.with({ text: 'Create User' }));

        await button.click();
      });

      it('should open user create dialog', () => {

        expect(dialog.open).toHaveBeenCalledExactlyOnceWith(UseCreateDialog);
      });

      it('should not create user', () => {
        const event = userEvents.createUser(undefined as unknown as UserEdit);

        expect(dispatcher.dispatch).not.toHaveBeenCalledTimes(2);
        expect(dispatcher.dispatch).not.toHaveBeenNthCalledWith(2, event);
      });
    });
  });

  describe('with user created successfully', () => {
    beforeEach(() => {
      mockedUserStore.userCreate.set({ data: undefined, state: LoadingState.Done });

      fixture.detectChanges()
    });

    it('should open snack bar', () => {

      expect(snackBar.open).toHaveBeenCalledExactlyOnceWith('saved', undefined, { duration: 3000 });
    });
  });

  describe('with user created unsuccessfully', () => {
    beforeEach(() => {
      mockedUserStore.userCreate.set({ data: undefined, state: LoadingState.Error, error: 'test-error' });

      fixture.detectChanges()
    });

    it('should open snack bar', () => {

      expect(snackBar.open).toHaveBeenCalledExactlyOnceWith('test-error', undefined, { duration: 3000 });
    });
  });
});
