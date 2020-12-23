import Vue from 'vue'
import VueRouter from 'vue-router'
import DrugsSearch from '../components/DrugsSearch'
Vue.use(VueRouter)

const routes = [{
        path: '/drug-looking',
        component: () =>
            import ("../components/DrugLooking"),
    },
    {
        path: '',
        name: '',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../components/DrugsSearch')
    }
]

const router = new VueRouter({
    mode: '',
    base: process.env.BASE_URL,
    routes
})

export default router