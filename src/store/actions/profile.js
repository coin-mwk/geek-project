import requests from "@/utils/request"
import { removeTokenInfo } from "@/utils/storage";
import { SAVE_PROFILE, SAVE_USER } from "../constant";

/**
 * 请求用户信息user
 * @returns Promise
 */
export const getUser = ()=>{
    return async dispatch=>{
        const res = await requests.get('/user');
        dispatch(saveUser(res.data));
    }
}
/**
 * 获取用户个人信息profile
 * @returns Promise
 */
export const getProfile= ()=>{
    return async(dispatch)=>{
        const res = await requests.get('/user/profile');
        dispatch(saveProfile(res.data));
    }
}

/**
 * 存放用户个人信息
 * @param {*} payload 
 * @returns 
 */
export const saveUser = (payload)=>{
    return{
        type:SAVE_USER,
        payload,
    }
}
/**
 * 存放用户个人信息
 * @param {*} payload 
 * @returns 
 */
 export const saveProfile = (payload)=>{
    return{
        type:SAVE_PROFILE,
        payload,
    }
}


export const updateProfile = (data)=>{
    return async dispatch =>{
        const res = await requests.patch('/user/profile', data);
        console.log(res);
    }
}

