import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
    modules: {}
})