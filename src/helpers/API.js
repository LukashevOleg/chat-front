import axios from "axios";
import {getToken, keycloak} from "./keycloak";

const baseURL = 'http://localhost:8090'

// Добавьте перехватчик для токена

export const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Access-Control': 'Allow-Headers',
        // 'Origin': 'http://localhost:3000'
    },
});



// instance.interceptors.request.use(async (config) => {
//     const token = getToken();
//     console.log(token)
//     config.headers = {
//         ...config.headers,
//         ...(token ? { Authorization: 'Bearer ' + token } : {}),
//     };
//     return config;
// });

instance.interceptors.request.use((config) => {
    const token = getToken();
    if (keycloak.authenticated) {
        config.headers.Authorization = `Bearer ${token}`; // Добавляем заголовок
        console.log('Токен добавлен в запрос:', token.slice(0, 10) + '...');
    } else {
        console.warn('Токен не найден, запрос без авторизации');
    }
    return Promise.resolve(config);
});