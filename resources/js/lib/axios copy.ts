import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// Flag to track if CSRF cookie has been initialized
let csrfInitialized = false;

// Request interceptor to ensure CSRF cookie is initialized
api.interceptors.request.use(async (config) => {
    if (!csrfInitialized) {
        try {
            await axios.get('/sanctum/csrf-cookie');
            csrfInitialized = true;
        } catch (error) {
            console.warn('Failed to initialize CSRF cookie:', error);
        }
    }
    return config;
});

// Response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Reset CSRF initialization flag on 401 errors
            csrfInitialized = false;
        }
        return Promise.reject(error);
    }
);

export default api;