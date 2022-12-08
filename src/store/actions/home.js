
import request from "@/utils/request";
import { setLocalChannels, getLocalChannels } from "@/utils/storage";
import { hasToken } from "@/utils/storage";

/**
 * 将用户频道保存到 Redux
 * @param {Array} channels
 * @returns
 */
export const saveUserChannels = (channels) => {
  return {
    type: 'home/channel',
    payload: channels,
  }
}

/**
 * 获取用户频道
 * @returns thunk
 */
export const getUserChannels = () => {
  return async (dispatch) => {
    // 1. 判断用户是否登录
    if (hasToken()) {
      const res = await request.get('/user/channels')
      dispatch(saveUserChannels(res.data.channels))
    } else {
      // 2. 没有token,从本地获取频道数据
      const channels = getLocalChannels()
      if (channels) {
        // 没有token，但本地有channels数据
        dispatch(saveUserChannels(channels))
      } else {
        // 没有token, 且本地没有channels数据
        const res = await request.get('/user/channels')
        dispatch(saveUserChannels(res.data.channels))
        // 保存到本地
        setLocalChannels(res.data.channels)
      }
    }
  }
}


/**
 * 获取所有的频道
 */
export const getAllChannels = () => {
  return async (dispatch) => {
    // 请求数据
    const res = await request.get('/channels')
    const { channels } = res.data

    // 将所有频道数据保存到 Redux
    dispatch(setAllChannels(channels))
  }
}

/**
 * 保存所有的频道
 * @param {*} channels
 * @returns
 */
export const setAllChannels = (channels) => {
  return {
    type: 'home/allChannel',
    payload: channels,
  }
}

// 添加频道
export const addChannel = (channel) => {
  return async (dispatch, getState) => {
    // 获取到所有的userChannels
    const { userChannels } = getState().home
    // 如果登录了，发送请求获取频道信息
    if (hasToken()) {
      await request.patch('/user/channels', {
        channels: [channel],
      })
    } else {
      // 如果没有登录，将频道数据保存到本地
      // 将channels数据保存本地
      setLocalChannels([...userChannels, channel])
    }
    dispatch(saveUserChannels([...userChannels, channel]))
  }
}

// 删除频道
export const delChannel = (channel) => {
  return async (dispatch, getState) => {
    // 获取到所有的userChannels
    const { userChannels } = getState().home
    // 如果登录了，发送请求获取频道信息
    if (hasToken()) {
      await request.delete(`/user/channels/${channel.id}`)
    } else {
      // 如果没有登录，将频道数据保存到本地
      // 将channels数据保存本地
      setLocalChannels(userChannels.filter((item) => item.id !== channel.id))
    }
    dispatch(
      saveUserChannels(userChannels.filter((item) => item.id !== channel.id))
    )
  }
}


// 获取文章列表数据
export const getArticleList = (channelId, timestamp) => {
  return async (dispatch) => {
    const res = await request.get('/articles', {
      params: {
        channel_id: channelId,
        timestamp: timestamp,
      },
    })
    // 将数据保存到redux中
    dispatch(
      setArticleList({
        channelId,
        timestamp: res.data.pre_timestamp,
        list: res.data.results,
      })
    )
  }
}

export const setArticleList = (payload) => {
  return {
    type: 'home/setArticleList',
    payload,
  }
}

// 获取文章列表数据  下拉刷新，获取更多文章列表数据
export const getMoreArticleList = (channelId, timestamp) => {
  return async (dispatch) => {
    const res = await request.get('/articles', {
      params: {
        channel_id: channelId,
        timestamp: timestamp,
      },
    })

    dispatch(
      setMoreArticleList({
        channelId,
        timestamp: res.data.pre_timestamp,
        list: res.data.results,
      })
    )
  }
}

export const setMoreArticleList = payload => {
  return {
    type: 'home/saveMoreArticleList',
    payload
  }
}

/**
 * 设置举报反馈菜单信息
 */
export const setFeedbackAction = ({ visible, articleId, channelId }) => ({
  type: 'home/feedback_action',
  payload: {
    visible,
    articleId,
    channelId
  },
})


// 点击不喜欢文章时的请求处理
export const unLikeArticle = (articleId, channelId) => {
  return async (dispatch, getState) => {
    await request({
      method: 'post',
      url: '/article/dislikes',
      data: {
        target: articleId
      }
    })
    // 把当前频道对应的文章删除
    const articles = getState().home.articles[channelId];
    const list = articles.list.filter(item => item.art_id !== articleId)

    dispatch(setArticleList({
      channelId,
      timestamp: articles.timestamp,
      list
    }))
  }
}

// 举报文章
export const reportArticle = (articleId, id) => {
  return async (dispatch, getState) => {
    await request({
      method: 'post',
      url: '/article/reports',
      data: {
        target: articleId,
        type:id
      }
    })
    // 把当前频道对应的文章删除
    const channelId = getState().home.feedbackAction.channelId;
    const articles = getState().home.articles[channelId];
    const list = articles.list.filter(item => item.art_id !== articleId)

    dispatch(setArticleList({
      channelId,
      timestamp: articles.timestamp,
      list
    }))
  }
}
