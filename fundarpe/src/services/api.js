import axios from 'axios';

const api = axios.create({
    baseURL: 'https://funcultura.fourdevs.com.br',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api;