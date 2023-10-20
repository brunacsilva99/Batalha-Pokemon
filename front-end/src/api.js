import axios from 'axios';

const port = process.env.PORT || 5000

const api = axios.create({
  baseURL: `http://localhost:${port}`, // Substitua pelo URL da sua API
});

export default api;
