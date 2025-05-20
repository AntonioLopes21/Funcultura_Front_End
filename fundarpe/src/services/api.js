import axios from 'axios';

// Chave da API
export const API_KEY = "g3z35#HSP#eeXU";

const api = axios.create({
    baseURL: 'https://funcultura.fourdevs.com.br',
    headers: {
        'Accept': 'application/json'
    }
});

export default api;