import { User, UserSchema } from './user.schema';

describe('user.schema', () => {
  let user: Partial<User>;

  beforeEach(() => {
    user = {
      id: 1,
      firstName: 'fake-first-name',
      lastName: 'fake-last-name',
      email:'fake@email.test',
    }
  });

  describe('with admin user', () => {
    beforeEach(() => {
      user.role = 'admin';
    });

    it('should fail with required phone number and birth date', () => {

      const result = UserSchema.safeParse(user);

      expect(result.error?.errors.length).toEqual(2);
      expect(result.error?.errors[0].path[0]).toEqual('phoneNumber');
      expect(result.error?.errors[0].message).toEqual('Required');
      expect(result.error?.errors[1].path[0]).toEqual('birthDate');
      expect(result.error?.errors[1].message).toEqual('Required');
    });

    describe('with phone number', () => {
      beforeEach(() => {
        user.phoneNumber = 'fake-phone-number';
      });

      it('should fail with required birth date', () => {

        const result = UserSchema.safeParse(user);

        expect(result.error?.errors.length).toEqual(1);
        expect(result.error?.errors[0].path[0]).toEqual('birthDate');
        expect(result.error?.errors[0].message).toEqual('Required');
      });

      describe('with birth date', () => {
        beforeEach(() => {
          user.birthDate = '2025-12-24';
        });

        it('should parse', () => {

          const result = UserSchema.safeParse(user);

          expect(result.data).toEqual({
            id: 1,
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

      expect(result.error?.errors.length).toEqual(1);
      expect(result.error?.errors[0].path[0]).toEqual('phoneNumber');
      expect(result.error?.errors[0].message).toEqual('Required');
    });

    describe('with phone number', () => {
      beforeEach(() => {
        user.phoneNumber = 'fake-phone-number';
      });

      it('should parse', () => {

        const result = UserSchema.safeParse(user);

        expect(result.data).toEqual({
          id: 1,
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
        id: 1,
        firstName: 'fake-first-name',
        lastName: 'fake-last-name',
        email:'fake@email.test',
        role: 'viewer',
      });
    });
  });
});
