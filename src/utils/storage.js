// 用户Token本地缓存键名
const TOKEN_KEY = 'geek-itcast';
const CHANNEL_KEY = 'geek-itcast-channel';

/**
 * 
 * @returns 从本地读取token信息
 */
export const getTokenInfo = ()=>{
    return JSON.parse(localStorage.getItem(TOKEN_KEY))||{}
}
/**
 * 将token信息存入本地
 * @param {*} tokeninfo 
 */
export const setTokenInfo = (tokeninfo)=>{
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokeninfo));
}
/**
 * 删除本地缓存的token信息
 */
export const removeTokenInfo = ()=>{
    localStorage.removeItem(TOKEN_KEY);
}
/**
 * 
 * @returns 判断本地是否有token信息
 */
export const hasToken = ()=>{
    return !!getTokenInfo().token;
}



/**
 * 保存频道数据到本地
 * @param {*} channels
 */
 export const setLocalChannels = (channels) => {
    localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
  }
  
  /**
   * 获取本地的频道数据，，，，，，，如果没有数据，不要默认为空数组
   * @returns
   */
  export const getLocalChannels = () => {
    return JSON.parse(localStorage.getItem(CHANNEL_KEY))
  }
  
  /**
   * 删除本地的频道数据
   */
  export const removeLocalChannels = () => {
    localStorage.removeItem(CHANNEL_KEY)
  }