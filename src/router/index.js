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
            path: '',
            component: () =>
                import ("../components/SearchDrug"),
        }, {
            path: '/lookdrug',
            component: () =>
                import ("../components/LookDrug"),
        }, {
            path: '/adddrug',
            component: () =>
                import ("../components/AdddDug"),
        }]
    }, {
        path: "/purchasedata",
        component: () =>
            import ( /* webpackChunkName: "purchasedata" */ "../components/PurchaseData"),
        children: [{
            path: "/checkdrug",
            component: () =>
                import ("../components/CheckDrug"),
        }, {
            path: "/lookrecords",
            component: () =>
                import ("../components/LookRecords"),
        }, {
            path: "/suppliermannage",
            component: () =>
                import ("../components/SupplierMannage"),
        }, ]
    }, {
        path: "/druginventory",
        component: () =>
            import ( /* webpackChunkName: "druginventory" */ "../components/SupplierMannage"),
        children: [{
            path: "/searchinventory",
            component: () =>
                import ("../components/SearchInventory"),
        }, {
            path: "/lookallinventory",
            component: () =>
                import ("../components/LookallInventory"),
        }, {
            path: "/addinventory",
            component: () =>
                import ("../components/AddInventory"),
        }, ]
    }, {
        path: "/warninventory",
        component: () =>
            import ( /* webpackChunkName: "warninventory" */ "../components/WarnInventory"),
    }, {
        path: "/salerecordss",
        component: () =>
            import ( /* webpackChunkName: "salerecordss" */ "../components/SaleRecordss"),
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router