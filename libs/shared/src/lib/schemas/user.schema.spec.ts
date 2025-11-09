import { treeifyError } from 'zod';

import { User, UserEditSchema, UserSchema } from './user.schema';

describe('user.schema', () => {
  let user: Partial<User>;

  describe('UserEditSchema', () => {
    beforeEach(() => {
      user = {
        id: 123,
        firstName: 'fake-first-name',
        lastName: 'fake-last-name',
        email:'fake@email.test',
      }
    });

    describe('with non-number id', () => {
      beforeEach(() => {
        user.id = 'fake-id' as unknown as number;
      });

      it('should fail with non-number id', () => {

        const result = UserSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.id?.errors[0];
        }

        expect(message).toBe('users.error.id.number');
      });
    });

    describe('with non-integer id', () => {
      beforeEach(() => {
        user.id = 1.23;
      });

      it('should fail with non-integer id', () => {

        const result = UserSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.id?.errors[0];
        }

        expect(message).toBe('users.error.id.int');
      });
    });

    describe('with non-positive id', () => {
      beforeEach(() => {
        user.id = 0;
      });

      it('should fail with non-positive id', () => {

        const result = UserSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.id?.errors[0];
        }

        expect(message).toBe('users.error.id.positive');
      });
    });

    describe('with non-string first name', () => {
      beforeEach(() => {
        user.firstName = 0 as unknown as string;
      });

      it('should fail with non-string first name', () => {

        const result = UserSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.firstName?.errors[0];
        }

        expect(message).toBe('users.error.firstName.string');
      });
    });

    describe('with empty first name', () => {
      beforeEach(() => {
        user.firstName = ' ';
      });

      it('should fail with required first name', () => {

        const result = UserSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.firstName?.errors[0];
        }

        expect(message).toBe('users.error.firstName.required');
      });
    });

    describe('with non-string last name', () => {
      beforeEach(() => {
        user.lastName = 0 as unknown as string;
      });

      it('should fail with non-string last name', () => {

        const result = UserSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.lastName?.errors[0];
        }

        expect(message).toBe('users.error.lastName.string');
      });
    });

    describe('with empty last name', () => {
      beforeEach(() => {
        user.lastName = ' ';
      });

      it('should fail with required last name', () => {

        const result = UserSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.lastName?.errors[0];
        }

        expect(message).toBe('users.error.lastName.required');
      });
    });

    describe('with incorrect email', () => {
      beforeEach(() => {
        user.email = 'fake-email';
      });

      it('should fail with format email', () => {

        const result = UserSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.email?.errors[0];
        }

        expect(message).toBe('users.error.email.format');
      });
    });

    describe('with non-string phone number', () => {
      beforeEach(() => {
        user.phoneNumber = 0 as unknown as string;
      });

      it('should fail with non-string phone number', () => {

        const result = UserSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.phoneNumber?.errors[0];
        }

        expect(message).toBe('users.error.phoneNumber.string');
      });
    });

    describe('with empty phone number', () => {
      beforeEach(() => {
        user.phoneNumber = ' ';
      });

      it('should fail with required phone number', () => {

        const result = UserSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.phoneNumber?.errors[0];
        }

        expect(message).toBe('users.error.phoneNumber.required');
      });
    });

    describe('with incorrect birth date', () => {
      beforeEach(() => {
        user.birthDate = 'fake-birth-date';
      });

      it('should fail with format birth date', () => {

        const result = UserSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.birthDate?.errors[0];
        }

        expect(message).toBe('users.error.birthDate.format');
      });
    });

    describe('with invalid role', () => {
      beforeEach(() => {
        user.role = 'invalid-role' as unknown as User['role'];
      });

      it('should fail with invalid role', () => {

        const result = UserSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.role?.errors[0];
        }

        expect(message).toBe('users.error.role.value');
      });
    });

    describe('with empty role', () => {
      beforeEach(() => {
        user.role = undefined as unknown as User['role'];
      });

      it('should fail with invalid role', () => {

        const result = UserSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.role?.errors[0];
        }

        expect(message).toBe('users.error.role.value');
      });
    });

    describe('with admin user', () => {
      beforeEach(() => {
        user.role = 'admin';
      });

      it('should fail with required phone number and birth date', () => {

        const result = UserSchema.safeParse(user);

        expect(result.error?.issues.length).toBe(2);
        expect(result.error?.issues[0].path[0]).toBe('phoneNumber');
        expect(result.error?.issues[0].message).toBe('users.error.phoneNumber.required');
        expect(result.error?.issues[1].path[0]).toBe('birthDate');
        expect(result.error?.issues[1].message).toBe('users.error.birthDate.required');
      });

      describe('with phone number', () => {
        beforeEach(() => {
          user.phoneNumber = 'fake-phone-number';
        });

        it('should fail with required birth date', () => {

          const result = UserSchema.safeParse(user);

          expect(result.error?.issues.length).toBe(1);
          expect(result.error?.issues[0].path[0]).toBe('birthDate');
          expect(result.error?.issues[0].message).toBe('users.error.birthDate.required');
        });

        describe('with birth date', () => {
          beforeEach(() => {
            user.birthDate = '2025-12-24';
          });

          it('should parse', () => {

            const result = UserSchema.safeParse(user);

            expect(result.data).toEqual({
              id: 123,
              firstName: 'fake-first-name',
              lastName: 'fake-last-name',
              email:'fake@email.test',
              phoneNumber: 'fake-phone-number',
              birthDate: '2025-12-24',
              role: 'admin',
            });
          });
        });
      });
    });

    describe('with editor user', () => {
      beforeEach(() => {
        user.role = 'editor';
      });

      it('should fail with required phone number', () => {

        const result = UserSchema.safeParse(user);

        expect(result.error?.issues.length).toBe(1);
        expect(result.error?.issues[0].path[0]).toBe('phoneNumber');
        expect(result.error?.issues[0].message).toBe('users.error.phoneNumber.required');
      });

      describe('with phone number', () => {
        beforeEach(() => {
          user.phoneNumber = 'fake-phone-number';
        });

        it('should parse', () => {

          const result = UserSchema.safeParse(user);

          expect(result.data).toEqual({
            id: 123,
            firstName: 'fake-first-name',
            lastName: 'fake-last-name',
            email:'fake@email.test',
            phoneNumber: 'fake-phone-number',
            role: 'editor',
          });
        });
      });
    });

    describe('with viewer user', () => {
      beforeEach(() => {
        user.role = 'viewer';
      });

      it('should parse', () => {

        const result = UserSchema.safeParse(user);

        expect(result.data).toEqual({
          id: 123,
          firstName: 'fake-first-name',
          lastName: 'fake-last-name',
          email:'fake@email.test',
          role: 'viewer',
        });
      });
    });
  });

  describe('UserEditSchema', () => {
    beforeEach(() => {
      user = {
        firstName: 'fake-first-name',
        lastName: 'fake-last-name',
        email:'fake@email.test',
      }
    });

    describe('with non-string first name', () => {
      beforeEach(() => {
        user.firstName = 0 as unknown as string;
      });

      it('should fail with non-string first name', () => {

        const result = UserEditSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.firstName?.errors[0];
        }

        expect(message).toBe('users.error.firstName.string');
      });
    });

    describe('with empty first name', () => {
      beforeEach(() => {
        user.firstName = ' ';
      });

      it('should fail with required first name', () => {

        const result = UserEditSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.firstName?.errors[0];
        }

        expect(message).toBe('users.error.firstName.required');
      });
    });

    describe('with non-string last name', () => {
      beforeEach(() => {
        user.lastName = 0 as unknown as string;
      });

      it('should fail with non-string last name', () => {

        const result = UserEditSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.lastName?.errors[0];
        }

        expect(message).toBe('users.error.lastName.string');
      });
    });

    describe('with empty last name', () => {
      beforeEach(() => {
        user.lastName = ' ';
      });

      it('should fail with required last name', () => {

        const result = UserEditSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.lastName?.errors[0];
        }

        expect(message).toBe('users.error.lastName.required');
      });
    });

    describe('with incorrect email', () => {
      beforeEach(() => {
        user.email = 'fake-email';
      });

      it('should fail with format email', () => {

        const result = UserEditSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.email?.errors[0];
        }

        expect(message).toBe('users.error.email.format');
      });
    });

    describe('with non-string phone number', () => {
      beforeEach(() => {
        user.phoneNumber = 0 as unknown as string;
      });

      it('should fail with non-string phone number', () => {

        const result = UserEditSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.phoneNumber?.errors[0];
        }

        expect(message).toBe('users.error.phoneNumber.string');
      });
    });

    describe('with empty phone number', () => {
      beforeEach(() => {
        user.phoneNumber = ' ';
      });

      it('should fail with required phone number', () => {

        const result = UserEditSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.phoneNumber?.errors[0];
        }

        expect(message).toBe('users.error.phoneNumber.required');
      });
    });

    describe('with incorrect birth date', () => {
      beforeEach(() => {
        user.birthDate = 'fake-birth-date';
      });

      it('should fail with format birth date', () => {

        const result = UserEditSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.birthDate?.errors[0];
        }

        expect(message).toBe('users.error.birthDate.format');
      });
    });

    describe('with invalid role', () => {
      beforeEach(() => {
        user.role = 'invalid-role' as unknown as User['role'];
      });

      it('should fail with invalid role', () => {

        const result = UserEditSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.role?.errors[0];
        }

        expect(message).toBe('users.error.role.value');
      });
    });

    describe('with empty role', () => {
      beforeEach(() => {
        user.role = undefined as unknown as User['role'];
      });

      it('should fail with invalid role', () => {

        const result = UserEditSchema.safeParse(user);

        let message;
        if (result.error) {
          message = treeifyError(result.error).properties?.role?.errors[0];
        }

        expect(message).toBe('users.error.role.value');
      });
    });

    describe('with admin user', () => {
      beforeEach(() => {
        user.role = 'admin';
      });

      it('should fail with required phone number and birth date', () => {

        const result = UserEditSchema.safeParse(user);

        expect(result.error?.issues.length).toBe(2);
        expect(result.error?.issues[0].path[0]).toBe('phoneNumber');
        expect(result.error?.issues[0].message).toBe('users.error.phoneNumber.required');
        expect(result.error?.issues[1].path[0]).toBe('birthDate');
        expect(result.error?.issues[1].message).toBe('users.error.birthDate.required');
      });

      describe('with phone number', () => {
        beforeEach(() => {
          user.phoneNumber = 'fake-phone-number';
        });

        it('should fail with required birth date', () => {

          const result = UserEditSchema.safeParse(user);

          expect(result.error?.issues.length).toBe(1);
          expect(result.error?.issues[0].path[0]).toBe('birthDate');
          expect(result.error?.issues[0].message).toBe('users.error.birthDate.required');
        });

        describe('with birth date', () => {
          beforeEach(() => {
            user.birthDate = '2025-12-24';
          });

          it('should parse', () => {

            const result = UserEditSchema.safeParse(user);

            expect(result.data).toEqual({
              firstName: 'fake-first-name',
              lastName: 'fake-last-name',
              email:'fake@email.test',
              phoneNumber: 'fake-phone-number',
              birthDate: '2025-12-24',
              role: 'admin',
            });
          });
        });
      });
    });

    describe('with editor user', () => {
      beforeEach(() => {
        user.role = 'editor';
      });

      it('should fail with required phone number', () => {

        const result = UserEditSchema.safeParse(user);

        expect(result.error?.issues.length).toBe(1);
        expect(result.error?.issues[0].path[0]).toBe('phoneNumber');
        expect(result.error?.issues[0].message).toBe('users.error.phoneNumber.required');
      });

      describe('with phone number', () => {
        beforeEach(() => {
          user.phoneNumber = 'fake-phone-number';
        });

        it('should parse', () => {

          const result = UserEditSchema.safeParse(user);

          expect(result.data).toEqual({
            firstName: 'fake-first-name',
            lastName: 'fake-last-name',
            email:'fake@email.test',
            phoneNumber: 'fake-phone-number',
            role: 'editor',
          });
        });
      });
    });

    describe('with viewer user', () => {
      beforeEach(() => {
        user.role = 'viewer';
      });

      it('should parse', () => {

        const result = UserEditSchema.safeParse(user);

        expect(result.data).toEqual({
          firstName: 'fake-first-name',
          lastName: 'fake-last-name',
          email:'fake@email.test',
          role: 'viewer',
        });
      });
    });
  });
});
