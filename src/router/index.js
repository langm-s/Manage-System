import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
Vue.use(VueRouter)

/* 
  重写VueRouter中的push方法，避免多次重定位报错
*/
let originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
    return originalPush.call(this, location).catch(err => {})
}

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
            import ( /* webpackChunkName: "dashboard" */ "../components/Dashboard"),

        children: [
            /* 
        基础信息
      */
            {
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
            },


            /* 
             * 这里是进货信息模块路由分配
             */
            {
                path: "/checkdrugIn",
                component: () =>
                    import ("@/components/purchaseDrug/PurchaseDrug"),
            }, {
                path: "/lookrecords",
                component: () =>
                    import ("@/components/purchaseDrug/PurchaseRecord"),
            }, {
                path: "/suppliermannage",
                component: () =>
                    import ("@/components/purchaseDrug/Suppliers"),
            }, {
                path: "/searchAllDrug",
                component: () =>
                    import ("@/components/purchaseDrug/AddSearchList"),
            }, {
                path: "/add_drug_msg",
                component: () =>
                    import ("@/components/purchaseDrug/AddRecordMessage"),
            },

            /* 
                销售记录
             */
            {
                path: '/salerecordss',
                component: () =>
                    import ("../components/DrugSell")
            },
            // 销售预警
            {
                path: '/salerecordss',
                component: () =>
                    import ("../components/DrugSell")
            }, {
                path: '/warninventory',
                component: () =>
                    import ("../components/DrugWarning")
            },





            //   库存信息模块  
            {
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
                path: "/addinventory",
                component: () =>
                    import ("../components/AddInventory"),

            }, {
                path: "/adddruglist",
                component: () =>
                    import ("../components/AddDrugList")
            }, {
                path: "/adddrugnews",
                component: () =>
                    import ("../components/AddDrugNews")
            },
        ]
    },
]


const router = new VueRouter({
    mode: 'hash',
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