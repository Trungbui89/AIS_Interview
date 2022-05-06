import axios from 'axios';

export const apiAcc = axios.create({
    baseURL: 'http://localhost:8091/',
});

export const apiQuiz = axios.create({
    baseURL: 'http://localhost:8080/',
});

