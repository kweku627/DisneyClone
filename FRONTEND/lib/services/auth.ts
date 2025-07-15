import api from '../api';

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    return response.data; // expected: { token: '...' }
  },

  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data; // expected: { user: {...} }
  },
};
