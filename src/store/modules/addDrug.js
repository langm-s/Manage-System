const addDrug = {
    namespaced: true,
    state: {
        //原来的仓库药品
        allDrugs: [],
        //新添药品
        saveDrug: {},

    },
    mutations: {
        // 保存更新前的所有药品信息
        savePrevAllDrug: function(state, payload) {
            state.allDrugs = payload.allDrugs;
        },
        // 添加新药品信息
        saveNewDrug: function(state, payload) {
            state.saveDrug = payload.newDrug;
            // 添加新药品
            state.allDrugs.unshift(state.saveDrug);
            // state.saveDrug = {};
            // console.log(state.allDrugs);
        },
    },
    getters: {},
    actions: {}
}
export default addDrug;