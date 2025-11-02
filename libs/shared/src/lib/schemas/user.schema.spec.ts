import { UserSchema } from './user.schema';

describe('user.schema', () => {
  it('should parse', () => {
    const data = {
      id: 1,
      firstName: 'fake-first-name',
      lastName: 'fake-last-name',
      email:'fake@email.test',
      phoneNumber: 'fake-phone-number',
      birthDate: '2025-01-01',
      role: 'admin',
    };

    const result = UserSchema.safeParse(data);

    expect(result.data).toEqual({
      id: 1,
      firstName: 'fake-first-name',
      lastName: 'fake-last-name',
      email:'fake@email.test',
      phoneNumber: 'fake-phone-number',
      birthDate: '2025-01-01',
      role: 'admin',
    });
  });
});
