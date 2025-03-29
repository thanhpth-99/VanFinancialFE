import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import BlankLayout from '../layouts/BlankLayout.vue'
//import LoginComponent from '../components/login/LoginComponent.vue'

const routes: Array<RouteRecordRaw> = [{ path: '/', component: BlankLayout }]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
