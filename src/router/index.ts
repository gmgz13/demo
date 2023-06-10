import {createRouter, createWebHistory} from "vue-router";
import home from "../views/home.vue";
import threeDemo from "../views/threeDemo.vue";
import order from "../views/order.vue";
import login from "../views/login.vue";
import person from "../views/person.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: 'home',
            name: '/',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: threeDemo,
                },
                {
                    path:'/order',
                    name:'order',
                    component:order,
                },
                {
                    path:'/login',
                    name:'login',
                    component:login,
                },
                {
                    path:'/person',
                    name:'person',
                    component:person,
                },
            ]
        }
    ]
});

export default router;
