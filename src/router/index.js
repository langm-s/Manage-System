import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login.vue'
import CommonNav from "@/components/CommonNav.vue"
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
        path: '/commonNav',
        name: 'CommonNav',
        component: CommonNav
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () =>
            //     import ( /* webpackChunkName: "about" */ '../components/CommonNav.vue')
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router