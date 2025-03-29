import { defineStore } from 'pinia'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import router from '../routes/index'

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref<string | null>(sessionStorage.getItem('accessToken'))
    const refreshToken = ref<string | null>(sessionStorage.getItem('refreshToken'))
    const role = ref<string | null>(sessionStorage.getItem('role'))
    let inactivityTimer: ReturnType<typeof setTimeout>

    const TIMER_ACTIVITY = 600000 // 10 minutes

    const setToken = (newAccessToken: string, newRefreshToken: string): void => {
        accessToken.value = newAccessToken
        refreshToken.value = newRefreshToken

        sessionStorage.setItem('accessToken', newAccessToken)
        sessionStorage.setItem('refreshToken', newRefreshToken)

        setupInactivityTimer()
    }

    const setRole = (newRole: string): void => {
        role.value = newRole
        sessionStorage.setItem('role', newRole)
    }

    const clearRole = (): void => {
        role.value = null
        sessionStorage.removeItem('role')
    }

    const clearToken = (): void => {
        accessToken.value = null
        refreshToken.value = null

        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('refreshToken')

        clearTimeout(inactivityTimer)
        clearRole()

        sessionStorage.clear()
        setupInactivityTimer()
    }

    const setupInactivityTimer = (): void => {
        inactivityTimer = setTimeout(() => {
            clearToken()
            clearRole()
            router.push('/')
        }, TIMER_ACTIVITY)
    }

    const resetInactivityTimer = (): void => {
        clearTimeout(inactivityTimer)
        setupInactivityTimer()
    }

    onMounted(() => {
        window.addEventListener('mousemove', resetInactivityTimer)
        window.addEventListener('keypress', resetInactivityTimer)
    })

    onBeforeUnmount(() => {
        clearTimeout(inactivityTimer)
        window.removeEventListener('mousemove', resetInactivityTimer)
        window.removeEventListener('keypress', resetInactivityTimer)
    })

    return { accessToken, refreshToken, setToken, clearToken, setRole }
})