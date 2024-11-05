// frontend/src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api' // Asegúrate de que la base URL sea correcta
});

export default api;
