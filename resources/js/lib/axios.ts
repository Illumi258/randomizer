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


// Response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    async(error) => {
        const status = error.response?.status;
        const config = error.config;
        // 419 -> Refresh CSRF and retry once
        if (status === 419 && config && !config._retry) {
            error.config._retry
            await api.get('/sanctum/csrf-cookie');

            return api.request(config);
        }

        // 419 -> Not authenticated
        if (status === 401 && !config._retry) {
            // optional: clear zustand auth store
            // useAuthStore.getState().logout();

            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;