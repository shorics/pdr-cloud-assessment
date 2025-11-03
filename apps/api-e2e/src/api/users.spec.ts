import axios from 'axios';

describe('users', () => {
  describe('GET /users', () => {
    it('should return users array', async () => {
      const page = 123;

      const result = await axios.get('/users', { params: { page } });

      expect(result.status).toBe(200);
      expect(result.data).toEqual([{
        id: 123,
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.test',
        phoneNumber: '213213',
        birthDate: '2025-12-24',
        role: 'admin',
      }]);
    });
  });

  describe('GET /users/:id', () => {
    it('should return user', async () => {
      const id = 123;

      const result = await axios.get(`/users/${id}`);

      expect(result.status).toBe(200);
      expect(result.data).toEqual({
        id: 123,
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.test',
        phoneNumber: '213213',
        birthDate: '2025-12-24',
        role: 'admin',
      });
    });
  });

  describe('POST /users', () => {
    it('should create user', async () => {
      const user = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.test',
        phoneNumber: '213213',
        birthDate: '2025-12-24',
        role: 'admin',
      };

      const result = await axios.post('/users', user);

      expect(result.status).toBe(201);
      expect(result.data).toEqual({
        id: 101,
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.test',
        phoneNumber: '213213',
        birthDate: '2025-12-24',
        role: 'admin',
      });
    });
  });

  describe('PUT /users/:id', () => {
    it('should return user', async () => {
      const id = 123;
      const user = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.test',
        phoneNumber: '213213',
        birthDate: '2025-12-24',
        role: 'admin',
      };

      const result = await axios.put(`/users/${id}`, user);

      expect(result.status).toBe(200);
      expect(result.data).toEqual({
        id: 123,
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@email.test',
        phoneNumber: '213213',
        birthDate: '2025-12-24',
        role: 'admin',
      });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should return user', async () => {
      const id = 123;

      const result = await axios.delete(`/users/${id}`);

      expect(result.status).toBe(200);
      expect(result.data).toEqual('');
    });
  });
});
