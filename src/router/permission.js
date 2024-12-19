import router from './index' // 引入路由实例
import { useUserStore } from '@/stores/user' // 假设你使用 Pinia 存储用户状态

// 定义需要登录才能访问的路由路径
const authRoutes = [
    '/profile',
    '/orders',
    '/cart',
    // 添加其他需要登录才能访问的路径
]

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const isLoggedIn = userStore.isLoggedIn // 获取登录状态

    // 判断目标路由是否需要登录权限
    const requiresAuth = authRoutes.includes(to.path)

    if (requiresAuth && !isLoggedIn) {
        // 如果需要登录但未登录，重定向到登录页
        next({
            path: '/login',
            // 保存原本要去的路径，登录后可以直接跳转
            query: { redirect: to.fullPath }
        })
    } else {
        // 不需要登录或已登录，直接放行
        next()
    }
})

export default router 