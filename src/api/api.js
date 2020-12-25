import myaxios from "../network/request"

/* 
  导出各种接口
*/
// 登录请求数据接口
export const login = (params) => {
        return myaxios.post('273794/login', params).catch(err => console.log(err));
    }
    /* 获取药品基本信息接口 */
export const getDrugMessage = () => {
        return myaxios.get("273802/addDrug/search").catch(err => { console.log(err) })
    }
    //搜索药品接口
export const drugsSearch = () => {
    return myaxios.get('273802/addDrug/search')
        .catch(err => console.log(err))
}


/* 获取进货记录数据 */
export const getRecordMessage = () => {
        return myaxios.get("273802/stock/").catch(err => { console.log(err) })
    }
    /* 获取供应商数据 */
export const getSupplier = () => {
    return myaxios.get("273802/supplier").catch(err => {
        console.log(err);
    })
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
    //药品库存信息请求接口
export const getInventory = () => {
    return myaxios.get("273802/look").catch(err => console.log(err));
}

// 药品添加库存接口
export const getAddDrug = () => {
    return myaxios.get("273802/%20inventory").catch(err => console.log(err));
}