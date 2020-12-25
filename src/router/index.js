import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
Vue.use(VueRouter)

/* 避免 ) NavigationDuplicated: Avoided redundant navigation to current location: "/dashboard" */
let originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
    return originalPush.call(this, location).catch(() => {});
};
const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () =>
        component: () =>
            import ( /* webpackChunkName: "dashboard" */ "../components/Dashboard"),
        children: [{
            path: '',
            component: () =>
                import ("../components/DrugsSearch")
        }, {
            path: '/drug_details',
            component: () =>
                import ("../components/DrugDetails")
        }, {
            path: '/lookdrug',
            component: () =>
                import ("../components/DrugLooking")

        }, {
            path: '/adddrug',
            component: () =>
                import ("../components/AddDrugs")
        }, {
            path: '/salerecordss',
            component: () =>
                import ("../components/DrugSell")
        }]
    },

]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach(function(to, from, next) {
    // console.log("全局前置导航守卫");
    let is_login = localStorage.getItem("is_login");
    if (is_login || to.path === "/") {
        next();
    } else {
        next("/"); // 否则情况下跳转登陆页面
    }
});
export default router