const purchaseDrug = {
  namespaced: true,
  state: {
    /* 
      以下是进货模块的状态存储 
    */

    /* 管理药品入库时搜索的药品 */
    searchDrugData:[],
    /* 匹配选择的药品 */
    chosenDrug:{},
    /* 供应商的提示数据在这里存储 */
    suppliers:[],
    /* 原来的进货记录 */
    allRecord:[],
    /* 审核入库的订单记录信息 */
    newPurchaseRecord:{},
    /* 供货商的数据存储 */
    allsuppliers:[],
    /* 新增供货商的信息 */
    newSupplier:{},

  },
  mutations: {
    /* 
      以下是进货模块的状态更改 
    */

    /* 管理药品入库时搜索的药品名称 */
    mapSearch:function(state,payload){
      if(!payload.drug_name){
        state.searchDrugData = payload.allDrugData;
      }else {
        state.searchDrugData = [];
        payload.allDrugData.map((item,index)=>{
          if(item.drugName.indexOf(payload.drug_name) != -1){
            state.searchDrugData.push(item);
          }
        });
      }
    },
    /* 匹配选择哪一种具体的药品，保存其信息 */
    choseDrug:function(state,payload){
      state.chosenDrug = payload.chosenDrug;
    },
    /* 加载原来的进货订单 */
    saveprevRecord:function(state,payload){
      state.allRecord = payload.allRecord;
    },
    /* 保存审核入库的订单记录信息 */
    saveNewRecord: function(state,payload){
      state.newPurchaseRecord = payload.newPurchaseRecord;
    },
    /* 更新总订单 */
    updateAllRecord:function(state){
      /* 进货订单添加最新记录 */
      /* 如果最新记录中为空 则不执行操作 */
      if(!state.newPurchaseRecord.drugName){
        return state.allRecord;
      }
      /* 把最新记录添加到总订单记录中 */
      state.allRecord.unshift(state.newPurchaseRecord);
      /* 让最新订单记录回到空 */
      state.newPurchaseRecord = {};
    }

  },
  actions: {
  },
  getters:{
  },
  modules: {
  }
}
export default purchaseDrug;