import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
    /* 引入模块 */
import PurchaseDrug from './modules/purchaseDrug'
//引入模块
import Search from "./modules/search"
import AddDrug from "./modules/addDrug"
let store = new Vuex.Store({
    state: {
        searchDrug: [],
        searchData: [],
        addDrugNews: [],
        addDrugForm: []
    },
    mutations: { //同步操作
        mapSearch: function(state, payload) {
            state.searchDrug = payload.drugData
        },
        searchInventory: function(state, payload) {
            state.searchData = payload.searchResult
        },
        addDrugIn: function(state, payload) {
            state.addDrugNews = payload.newDrugNews
            state.addDrugForm = payload.newDrugForm

        },

    },
    actions: {},
    modules: {
        /* 进货信息模块状态管理 */
        purchaseDrug: PurchaseDrug,
        search: Search,
        addDrug: AddDrug
    }
})
export default store;