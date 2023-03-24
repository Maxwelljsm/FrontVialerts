import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://3.231.9.74:5000',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    },
    
})