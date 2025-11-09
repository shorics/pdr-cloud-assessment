import { UserListSchema } from './user-list.schema';

describe('UserListSchema', () => {
  let schema: typeof UserListSchema;

  beforeEach(() => {
    schema = UserListSchema;
  });

  it('should create', () => {

    expect(schema).toBeTruthy();
  });
});
