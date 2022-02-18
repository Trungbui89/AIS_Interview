import axios from 'axios';

export const apiAcc = axios.create({
    baseURL: 'http://localhost:8091/',
});

export const apiQuiz = axios.create({
    baseURL: 'http://localhost:8080/',
});

export const apiCandidate = axios.create({
    baseURL: 'http://localhost:8085/',
});
export const apiTest = axios.create({
    baseURL: 'http://localhost:8085/',
});