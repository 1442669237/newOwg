import { defineStore } from 'pinia'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token'),
        userInfo: null
    }),
    actions: {
        logout() {
            this.token = null
            this.userInfo = null
            localStorage.removeItem('token')
            router.push('/login')
        },
        handleTokenExpired() {
            ElMessageBox.confirm(
                '您的登录已过期，请重新登录',
                '登录过期',
                {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                this.logout()
            })
        }
    }
}) 