import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
    //引入模块
import Search from "./modules/search"
import AddDrug from "./modules/addDrug"
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        search: Search,
        addDrug: AddDrug
    }
})