import axios from 'axios';

// Chave da API
export const API_KEY = "dsh&*osoi28gf21020k&!(";

const api = axios.create({
    baseURL: 'https://funcultura.fourdevs.com.br',
    headers: {
        'Accept': 'application/json'
    }
});

export default api;