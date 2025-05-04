import axios from 'axios';

const api = axios.create({
    baseURL: 'https://funcultura.fourdevs.com.br',
})

export default api;