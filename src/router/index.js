import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

/* 
  重写VueRouter中的push方法，避免多次重定位报错
*/
let originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location){
  return originalPush.call(this,location).catch(err=>{})
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>import ( /* webpackChunkName: "dashboard" */ "../components/Dashboard"),
    children: [
      {
        path: '/searchDrug',
        // component: () => import ("../components/SearchDrug"),
      }, 
      {
          path: '/lookdrug',
          // component: () => import ("../components/LookDrug"),
      }, 
      {
          path: '/adddrug',
          // component: () => import ("../components/AdddDug"),
      },
    
      /* 
        * 这里是进货信息模块路由分配
      */
    
      {
        path: "/checkdrug",
        component: () => import ("@/components/purchaseDrug/PurchaseDrug"),
      }, {
          path: "/lookrecords",
          component: () => import ("@/components/purchaseDrug/PurchaseRecord"),
      }, {
          path: "/suppliermannage",
          component: () => import ("@/components/purchaseDrug/Suppliers"),
      }, {
        path:"/searchAllDrug",
        component: () => import ("@/components/purchaseDrug/AddSearchList"),
      },{
        path:"/add_drug_msg",
        component: () => import ("@/components/purchaseDrug/AddRecordMessage"),
      },
    
    
      /* 
        *库存信息模块路由分配
      */
      {
        path: "/searchinventory",
        // component: () => import ("../components/SearchInventory"),
      }, {
          path: "/lookallinventory",
          // component: () => import ("../components/LookallInventory"),
      }, {
          path: "/addinventory",
          // component: () => import ("../components/AddInventory"),
      }, 
      {
        path: "/warninventory",
        // component: () => import ( /* webpackChunkName: "warninventory" */ "../components/WarnInventory"),
      },
      {
        path: "/salerecordss",
        // component: () => import ( /* webpackChunkName: "salerecordss" */ "../components/SaleRecordss"),
      }
    ]
  },
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
