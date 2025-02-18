import { createRouter, createWebHistory } from 'vue-router';
import LoginMain from '@/pages/domains/login/LoginMain.vue'
import LogoutMain from '@/pages/domains/login/LogoutMain.vue'
import MainMain from '@/pages/domains/main/MainMain.vue'
import UnknownMenuPage from "@/pages/domains/main/UnknownMenuPage.vue"
import WrongRoutingPage from './components/WrongRoutingPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: '/',
            component: LoginMain
        },
        {
            path: '/login',
            name: '/login',
            component: LoginMain
        },
        {
            path: '/logout',
            name: '/logout',
            component: LogoutMain
        },
        {
            path: '/main',
            name: '/main',
            component: MainMain,
            children: [],
        },
        {
            path: '/unknown',
            name: '/unknown',
            component: UnknownMenuPage,
        },
        {
            path: '/wrong',
            name: '/wrong',
            component: WrongRoutingPage,
        },
        {
            path: '/test',
            name: '/test',
            component: () => import('@/pages/domains/test/TestMain.vue')
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/wrong",
        }
    ]
})

export default router