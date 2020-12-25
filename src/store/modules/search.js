const search = {
    namespaced: true,
    state: {
        //过滤后的药品信息
        newData: []
    },
    mutations: {
        //往库里传入搜索到的药品信息
        mysearch: function(state, payload) {
            state.newData = payload.filterResult;
        }
    },
    getters: {},
    actions: {},
    // modules:{}
}
export default search;