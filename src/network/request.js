import axios from "axios";
/* 基本的 url */
const instance = axios.create({
    baseURL: "http://rap2api.taobao.org/app/mock/",
});
/* 响应的拦截器 */
instance.interceptors.response.use(
    function(response) {
        return response.data;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export default instance;