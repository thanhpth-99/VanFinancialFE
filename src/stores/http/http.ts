import axios, { type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig, AxiosError } from 'axios'
import { useAuthStore } from '../auth'
import router from '../../routes'

// const url = [{ dev: 'http://localhost:1688' }, { prod: '' }, { test: '' }]

// const env = [{ 1: 'dev' }, { 2: 'prod' }, { 3: 'test' }]
// const environment = 1

const https = axios.create({
    baseURL: 'http://localhost:1688',
    timeout: 20000
})

let isRefreshing = false
let failedQueue: { resolve: (value: string | PromiseLike<string>) => void; reject: (reason?: any) => void }[] = []

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token ?? '')
        }
    })
    failedQueue = []
}

https.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const authStore = useAuthStore();
        const token = authStore?.accessToken;
        if (token) config.headers.Authorization = `Bearer ${token}`
        
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

https.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data
    },
    async (error: AxiosError) => {
        const authStore = useAuthStore()
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                try {
                    const token = await new Promise<string>((resolve, reject) => {
                        // Kiểm tra để tránh lặp lại các yêu cầu trong hàng chờ
                        if (!failedQueue.find((req) => req.resolve.toString() === originalRequest.url)) {
                            failedQueue.push({ resolve, reject })
                        }
                    })
                    originalRequest.headers = originalRequest.headers || {}
                    originalRequest.headers.Authorization = 'Bearer ' + token
                    return await axios(originalRequest)
                } catch (err) {
                    return Promise.reject(err)
                }
            }

            originalRequest._retry = true
            isRefreshing = true

            const refreshToken = authStore.refreshToken
            if (!refreshToken) {
                authStore.clearToken()
                await router.push('/')
                return Promise.reject(error)
            }

            return new Promise((resolve, reject) => {
                post('/api/v1/auth/refresh', { refreshToken })
                    .then((response) => {
                        const { accessToken } = response.data;
                        authStore.setToken(accessToken, refreshToken)
                        https.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
                        originalRequest.headers = originalRequest.headers || {}
                        originalRequest.headers.Authorization = 'Bearer ' + accessToken
                        processQueue(null, accessToken)
                        resolve(axios(originalRequest))
                    })
                    .catch(async (err) => {
                        processQueue(err, null)
                        authStore.clearToken()
                        await router.push('/')
                        reject(err)
                    })
                    .finally(() => {
                        isRefreshing = false
                    })
            })
        }

        return Promise.reject(error)
    },
)

export const get = (url: string, params = {}) => {
    return https.get(url, { params })
}

export const post = (url: string, data: any) => {
    return https.post(url, data)
}

export const put = (url: string, data: any) => {
    return https.put(url, data)
}

export const del = (url: string, params = {}) => {
    return https.delete(url, params)
}