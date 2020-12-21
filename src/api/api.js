import myaxios from "../network/request"

/* 
  导出各种接口
*/
// 登录请求数据接口
export const login = (params)=>{
  return myaxios.post('273794/login',params).catch(err=>console.log(err));
}