import axios from 'axios';

describe('users', () => {
  beforeAll(async () => {
      const user = {
        firstName: 'test-first-name-1',
        lastName: 'test-last-name-1',
        email: 'test-1@email.test',
        phoneNumber: 'test-phone-number-1',
        birthDate: '2025-12-24',
        role: 'admin',
      };

      await axios.post('/users', user);
  });

  describe('GET /users', () => {
    it('should return users array', async () => {

      const result = await axios.get('/users');

      expect(result.status).toBe(200);
      expect(result.data).toEqual([{
        id: 1,
        firstName: 'test-first-name-1',
        lastName: 'test-last-name-1',
        email: 'test-1@email.test',
        phoneNumber: 'test-phone-number-1',
        birthDate: '2025-12-24',
        role: 'admin',
      }]);
    });
  });

  describe('GET /users/:id', () => {
    it('should return user', async () => {
      const id = 1;

      const result = await axios.get(`/users/${id}`);

      expect(result.status).toBe(200);
      expect(result.data).toEqual({
        id: 1,
        firstName: 'test-first-name-1',
        lastName: 'test-last-name-1',
        email: 'test-1@email.test',
        phoneNumber: 'test-phone-number-1',
        birthDate: '2025-12-24',
        role: 'admin',
      });
    });
  });

  describe('POST /users', () => {
    it('should create user', async () => {
      const user = {
        firstName: 'test-first-name-2',
        lastName: 'test-last-name-2',
        email: 'test-2@email.test',
        phoneNumber: 'test-phone-number-2',
        birthDate: '2025-01-01',
        role: 'viewer',
      };

      const result = await axios.post('/users', user);

      expect(result.status).toBe(201);
      expect(result.data).toEqual({
        id: 2,
        firstName: 'test-first-name-2',
        lastName: 'test-last-name-2',
        email: 'test-2@email.test',
        phoneNumber: 'test-phone-number-2',
        birthDate: '2025-01-01',
        role: 'viewer',
      });
    });
  });

  describe('PUT /users/:id', () => {
    it('should update user', async () => {
      const id = 1;
      const user = {
        firstName: 'test-first-name-1-updated',
        lastName: 'test-last-name-1-updated',
        email: 'test-1-updated@email.test',
        phoneNumber: 'test-phone-number-1-updated',
        birthDate: '2025-06-06',
        role: 'editor',
      };

      const result = await axios.put(`/users/${id}`, user);

      expect(result.status).toBe(200);
      expect(result.data).toEqual({
        id: 1,
        firstName: 'test-first-name-1-updated',
        lastName: 'test-last-name-1-updated',
        email: 'test-1-updated@email.test',
        phoneNumber: 'test-phone-number-1-updated',
        birthDate: '2025-06-06',
        role: 'editor',
      });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete user', async () => {
      const id = 1;

      const result = await axios.delete(`/users/${id}`);

      expect(result.status).toBe(200);
      expect(result.data).toEqual('');
    });
  });
});
