import axios from 'axios';

describe('users', () => {
  beforeAll(async () => {
      const user = {
        firstName: 'test-first-name-1',
        lastName: 'test-last-name-1',
        email: 'test-1@email.test',
        phoneNumber: '+1-000-000-0001',
        birthDate: '2025-12-24',
        role: 'admin',
      };

      await axios.post('/users', user);
  });

  describe('GET /users', () => {
    it('should return users array', async () => {

      const result = await axios.get('/users');

      expect(result.status).toBe(200);
      expect(result.data).toEqual(expect.arrayContaining([{
        id: 101,
        firstName: 'test-first-name-1',
        lastName: 'test-last-name-1',
        email: 'test-1@email.test',
        phoneNumber: '+1-000-000-0001',
        birthDate: '2025-12-24',
        role: 'admin',
      }]));
    });
  });

  describe('GET /users/:id', () => {
    let id: number;

    describe('with existing user', () => {
      beforeEach(() => {
        id = 101;
      });

      it('should return user', async () => {

        const result = await axios.get(`/users/${id}`);

        expect(result.status).toBe(200);
        expect(result.data).toEqual({
          id: 101,
          firstName: 'test-first-name-1',
          lastName: 'test-last-name-1',
          email: 'test-1@email.test',
          phoneNumber: '+1-000-000-0001',
          birthDate: '2025-12-24',
          role: 'admin',
        });
      });
    });

    describe('with non-existent user', () => {
      beforeEach(() => {
        id = 9999;
      });

      it('should return 404', async () => {

        const result = await axios.get(`/users/${id}`, { validateStatus: () => true });

        expect(result.status).toBe(404);
      });
    });
  });

  describe('POST /users', () => {
    it('should create user', async () => {
      const user = {
        firstName: 'test-first-name-2',
        lastName: 'test-last-name-2',
        email: 'test-2@email.test',
        phoneNumber: '+1-000-000-0002',
        birthDate: '2025-01-01',
        role: 'viewer',
      };

      const postResult = await axios.post('/users', user);
      const getAllResult = await axios.get('/users');

      expect(postResult.status).toBe(201);
      expect(postResult.data).toEqual({
        id: 102,
        firstName: 'test-first-name-2',
        lastName: 'test-last-name-2',
        email: 'test-2@email.test',
        phoneNumber: '+1-000-000-0002',
        birthDate: '2025-01-01',
        role: 'viewer',
      });
      expect(getAllResult.status).toBe(200);
      expect(getAllResult.data).toEqual(expect.arrayContaining([
        {
          id: 101,
          firstName: 'test-first-name-1',
          lastName: 'test-last-name-1',
          email: 'test-1@email.test',
          phoneNumber: '+1-000-000-0001',
          birthDate: '2025-12-24',
          role: 'admin',
        },
        {
          id: 102,
          firstName: 'test-first-name-2',
          lastName: 'test-last-name-2',
          email: 'test-2@email.test',
          phoneNumber: '+1-000-000-0002',
          birthDate: '2025-01-01',
          role: 'viewer',
        }
      ]));
    });
  });

  describe('PUT /users/:id', () => {
    let id: number;

    describe('with existing user', () => {
      beforeEach(() => {
        id = 101;
      });

      it('should update user', async () => {
        const user = {
          firstName: 'test-first-name-1-updated',
          lastName: 'test-last-name-1-updated',
          email: 'test-1-updated@email.test',
          phoneNumber: '+1-000-000-0003',
          birthDate: '2025-06-06',
          role: 'editor',
        };

        const putResult = await axios.put(`/users/${id}`, user);
        const getAllResult = await axios.get('/users');

        expect(putResult.status).toBe(200);
        expect(putResult.data).toEqual({
          id: 101,
          firstName: 'test-first-name-1-updated',
          lastName: 'test-last-name-1-updated',
          email: 'test-1-updated@email.test',
          phoneNumber: '+1-000-000-0003',
          birthDate: '2025-06-06',
          role: 'editor',
        });
        expect(getAllResult.status).toBe(200);
        expect(getAllResult.data).toEqual(expect.arrayContaining([{
          id: 101,
          firstName: 'test-first-name-1-updated',
          lastName: 'test-last-name-1-updated',
          email: 'test-1-updated@email.test',
          phoneNumber: '+1-000-000-0003',
          birthDate: '2025-06-06',
          role: 'editor',
        }]));
      });
    });

    describe('with non-existent user', () => {
      beforeEach(() => {
        id = 9999;
      });

      it('should return 404', async () => {
        const user = {
          firstName: 'test-first-name-1-updated',
          lastName: 'test-last-name-1-updated',
          email: 'test-1-updated@email.test',
          phoneNumber: '+1-000-000-0003',
          birthDate: '2025-06-06',
          role: 'editor',
        };

        const result = await axios.put(`/users/${id}`, user, { validateStatus: () => true });

        expect(result.status).toBe(404);
      });
    });
  });

  describe('DELETE /users/:id', () => {
    let id: number;

    describe('with existing user', () => {
      beforeEach(() => {
        id = 101;
      });

      it('should delete user', async () => {

        const deleteResult = await axios.delete(`/users/${id}`);
        const getAllResult = await axios.get('/users');

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.data).toEqual('');
        expect(getAllResult.status).toBe(200);
        expect(getAllResult.data).toEqual(expect.not.arrayContaining([{
          id: 101,
          firstName: 'test-first-name-1',
          lastName: 'test-last-name-1',
          email: 'test-1@email.test',
          phoneNumber: '+1-000-000-0001',
          birthDate: '2025-12-24',
          role: 'admin',
        }]));
      });
    });

    describe('with non-existent user', () => {
      beforeEach(() => {
        id = 9999;
      });

      it('should return 404', async () => {

        const result = await axios.delete(`/users/${id}`, { validateStatus: () => true });

        expect(result.status).toBe(404);
      });
    });
  });
});
