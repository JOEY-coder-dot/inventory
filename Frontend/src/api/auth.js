import axios from 'axios';

export const login = (username, password) =>
  axios.post('/api/login', { username, password });

export const register = (username, password) =>
  axios.post('/api/register', { username, password });
