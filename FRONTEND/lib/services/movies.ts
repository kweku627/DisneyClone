import api from '../api';

export const MovieService = {
  getTrending: async () => {
    const response = await api.get('/movies/trending');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  },

  getMarvelOriginals: async () => {
    const response = await api.get('/movies/marvel');
    return response.data;
  },

  getStarWars: async () => {
    const response = await api.get('/movies/star-wars');
    return response.data;
  },
};
