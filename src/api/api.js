import myaxios from "../network/request"

/* 
  导出各种接口
*/
// 登录请求数据接口
export const login = (params) => {
        return myaxios.post('273794/login', params).catch(err => console.log(err));
    }
    //搜索药品接口
export const drugsSearch = () => {
    return myaxios.get('273802/addDrug/search')
        .catch(err => console.log(err))
}
//销售记录接口
// http://rap2api.taobao.org/app/mock/273802/example/1608707486032
export const drugSell = () => {
  return myaxios.get('273802/example/1608707486032')
      .catch(err => console.log(err))
}
//库存预警接口
//http://rap2api.taobao.org/app/mock/273802/inventory%20/004
export const drugWarning = () => {
  return myaxios.get('273802/inventory%20/004')
      .catch(err => console.log(err))
}
