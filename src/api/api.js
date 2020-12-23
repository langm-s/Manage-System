import myaxios from "../network/request"

/* 
  导出各种接口
*/
// 登录请求数据接口
export const login = (params) => {
    return myaxios.post('273794/login', params).catch(err => console.log(err));
}

//药品库存信息请求接口
export const getInventory = () => {
    return myaxios.get("273802/%20inventory").catch(err => console.log(err));
}

// 药品添加库存接口
export const getAddDrug = () => {
    return myaxios.get("273802/stock").catch(err => console.log(err));
}