import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
/* 引入模块 */
import PurchaseDrug from './modules/purchaseDrug'
    //引入模块
import Search from "./modules/search"
import AddDrug from "./modules/addDrug"
let store =  new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
          /* 进货信息模块状态管理 */
    purchaseDrug: PurchaseDrug,
        search: Search,
        addDrug: AddDrug
    }
})
export default store;
