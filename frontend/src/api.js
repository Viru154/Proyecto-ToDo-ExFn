// frontend/src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/proyectos', // URL de tu backend
    validateStatus: (status) => {
        return status >= 200 && status < 300; // Acepta códigos de estado entre 200 y 299 como exitosos
    },
});

export default api;
    