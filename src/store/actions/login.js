// 存放有关login的action
import request from '@/utils/request'
import { setTokenInfo, removeTokenInfo } from '@/utils/storage';

// 发送短信验证码
export const sendValidationCode = mobile=>{
    return async (dispatch)=>{
        const res = await request.get(`/sms/codes/${mobile}`);
    }
}

/**
 * 登录验证
 * @param {*} data 
 * @returns 
 */
export const login = (data)=>{
    return async(dispatch)=>{
        const res = await request({
            method:'post',
            url:'/authorizations',
            data
        })
        // 保存token到redux中
        dispatch(saveToken(res.data))
        // 保存token到本地
        setTokenInfo(res.data)
    }
}
/**
 * 保存token
 * @param {*} payload 
 * @returns 
 */
export const saveToken = (payload)=>{
    return {
        type:'login/token',
        payload,
    }
}

/**
 * 个人信息中退出登录
 * @returns 
 */
 export const logout = ()=>{
    return dispatch =>{
        console.log(123123)
        // 移除本地token
        removeTokenInfo();
        // 移除redux中的token
        dispatch({
            type:'login/logout'
        });
    }
}