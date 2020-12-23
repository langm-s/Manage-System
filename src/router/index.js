import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login.vue'
import Login from "../views/Login.vue"
Vue.use(VueRouter);
/* 避免 ) NavigationDuplicated: Avoided redundant navigation to current location: "/dashboard" */
let originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function (location,onComplete,onAbort) {
//   return originalPush.call(this, location,onComplete,onAbort).catch(() => {});
// };
/* 
  VueRouter.prototype.push = function push (location, onComplete, onAbort) {
      var this$1 = this;

    // $flow-disable-line
    if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        this$1.history.push(location, resolve, reject);
      })
    } else {
      this.history.push(location, onComplete, onAbort);
    }
  };


*/

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
            path: '/searchinventory',
            component: () =>
                import ("../components/SearchInventory"),
        }, {
            path: "/drugtable",
            component: () =>
                import ("../components/DrugTable"),
        }, {
            path: "/lookallinventory",
            component: () =>
                import ("../components/LookAllInventory"),
        }, {
            path: "/lookallinventory",
            component: () =>
                import ("../components/LookAllInventory"),
        }, ]
    },
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router