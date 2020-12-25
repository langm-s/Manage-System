import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/* 引入模块 */
import PurchaseDrug from './modules/purchaseDrug'

let store =  new Vuex.Store({
  strict:true,// 如果修改不是通过mutations进行的，则会报错
  // 如直接使用$store.state.counter++
  modules:{
    /* 进货信息模块状态管理 */
    purchaseDrug: PurchaseDrug,
  }
})
export default store;
