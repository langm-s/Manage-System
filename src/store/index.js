import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        searchDrug: []
    },
    mutations: { //同步操作
        mapSearch: function(state, payload) {
            state.searchDrug = payload.drugData
        }
    },
    actions: {},
    modules: {}
})