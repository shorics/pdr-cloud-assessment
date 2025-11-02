import axios from 'axios';

describe('GET /users', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/users`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});
