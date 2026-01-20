import axios from 'axios';

const api = axios.create({
    baseURL: 'http://72.60.54.143:3000/',
    timeout: 10000,
});

const TOKEN_FIXO = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTc2ODkzMjQwNCwiZXhwIjoxNzY5MDE4ODA0fQ.xomGuy8AsBinP4OE9GFSIzNzCEN0tuSVhiSZUccqkok";

api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${TOKEN_FIXO}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;