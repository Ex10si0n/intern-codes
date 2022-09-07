import { createRouter, createWebHashHistory, Router } from "vue-router"
import Home from "../views/Home.vue";

const webHistory = createWebHashHistory()

export default createRouter({
    history: webHistory,
    routes: [
        { path: "/", component: () => import(/* webpackChunkName: "form" */ "../views/Form.vue") },
    ]
})