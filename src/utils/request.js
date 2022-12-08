// 对 axios二次封装
import { Toast } from "antd-mobile";
import axios from "axios";
import { getTokenInfo, hasToken } from "./storage";
import history from "./history";
import store from "@/store";
import { logout, saveToken } from "@/store/actions/login";
import { setTokenInfo,removeTokenInfo } from "./storage";

const baseURL = 'http://geek.itheima.net/v1_0'
const requests = axios.create({
    // 配置对象
    // 基础路劲，发请求的时候，路径当中会出现api，不红你手写
    baseURL,
    // 请求超时
    timeout: 5000
});
// 请求拦截器：在发送请求前，请求拦截器可以检测到，可以在请求发出去前做一些事情
requests.interceptors.request.use(config => {
    // config是一个配置对象，对象里面有一个属性很重要，headers请求头
    if (hasToken) {
        const token = getTokenInfo().token;
        config.headers.Authorization = 'Bearer ' + token;
        config.headers["X-AMINER-PRODUCT"] = 'reco',
        config.headers['Content-Type'] = 'application/json'
    }
    return config;
}, err => {
    return Promise.reject(err);
});

requests.interceptors.response.use(res => {
    // 成功的回调函数，服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情，
    return res.data;
}, async err => {
    // 如果因为网络原因 response没有，给提示消息
    if (!err.response) {
        Toast.show({
            content: '网络繁忙，请稍后再试!',
        });
        return Promise.reject(err);
    }
    // 不是token失效的原因
    if (err.response.status !== 401) {
        Toast.show({
            content: err.response.data.message,
        })
        return Promise.reject(err);
    }
    // 网络没问题 ， 且是401，token失效
    // 判断有没有刷新token
    const { token, refresh_token } = getTokenInfo();
    if (!refresh_token) {
        // 没token，跳转至登录页
        history.replace('/login', {
            from: history.location.pathname || '/home'
        })
        Toast.show({
            content: 'token失效!',
        });
        return Promise.reject(err);
    }
    // 是401错误，且有刷新token，刷新token
    try {
        // 通过 Refresh Token 换取新 Token
        // 特别说明：这个地方发请求的时候，不能使用新建的 http 实例去请求，要用默认实例 axios 去请求！
        // 否则会因 http 实例的请求拦截器的作用，携带上老的 token 而不是 refresh_token
        const res = await axios({
            method:'put',
            url:baseURL + '/authorizations',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + refresh_token
            }
        });

        // 将新换到的 Token 信息保存到 Redux 和 LocalStorage 中
        const tokenInfo = {
            token: res.data.data.token,
            refresh_token,
        }
        setTokenInfo(tokenInfo)
        store.dispatch(saveToken(tokenInfo))

        // 重新发送之前因 Token 无效而失败的请求
        return requests(err.config)
    } catch (error) {
        console.log("sasfsadfa")
        // ... 这里后续编写 Token 换取失败的逻辑 ...
        // 清除 Redux 和 LocalStorage 中 Token 信息
        removeTokenInfo()
        store.dispatch(logout)

        // 跳转到登录页，并携带上当前正在访问的页面，等登录成功后再跳回该页面
        history.push('/login', {
            from: history.location.pathname || '/home'
        })
        
        return Promise.reject(error)
    }

    return Promise.reject(err);
});
export default requests;

