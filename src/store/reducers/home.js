// 初始状态
const initialState = {
  userChannels: [],
  allChannels: [],
  // 存储所有的文章列表
  articles: {},
  feedbackAction: {
    // 控制弹出菜单的显示隐藏
    visible: false,
    // 当前反馈的目标文章ID
    articleId: 0,
    // 当前频道id
    channelId:0
  }
}

const home = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case 'home/channel':
      return {
        ...state,
        userChannels: payload,
      }
    case 'home/allChannel':
      return {
        ...state,
        allChannels: payload,
      }
    case 'home/setArticleList':
      return {
        ...state,
        articles: {
          ...state.articles,
          [payload.channelId]: {
            timestamp: payload.timestamp,
            list: payload.list,
          },
        },
      }
    case 'home/saveMoreArticleList':
      const channelId = payload.channelId
      const oldList = state.articles[channelId].list
      return {
        ...state,
        articles: {
          ...state.articles,
          [payload.channelId]: {
            timestamp: payload.timestamp,
            list: [...oldList, ...payload.list],
          },
        },
      }
    case 'home/feedback_action':
      return {
        ...state,
        feedbackAction: payload
      }

    default:
      return state
  }
}

export default home