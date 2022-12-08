import Icon from '@/components/Icon';
import { Modal } from 'antd-mobile-v2';
import { useState } from 'react';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setFeedbackAction, unLikeArticle,reportArticle } from '@/store/actions/home';
import { Toast } from 'antd-mobile';

/**
 * 举报反馈菜单
 */
const FeedbackActionMenu = () => {
  const dispatch = useDispatch()
  // 举报反馈菜单
  const list = [
    { id: 0, title: '其他问题' },
    { id: 1, title: '标题夸张' },
    { id: 2, title: '低俗色情' },
    { id: 3, title: '错别字多' },
    { id: 4, title: '旧闻重复' },
    { id: 5, title: '广告软文' },
    { id: 6, title: '内容不实' },
    { id: 7, title: '涉嫌违法犯罪' },
    { id: 8, title: '侵权' },
  ]
  // 弹框的状态
  const feedbackAction = useSelector(state => state.home.feedbackAction)
  // 关闭弹框时的事件监听函数 
  const onClose = () => {
    // 更新弹出菜单的状态
    dispatch(setFeedbackAction({
      visible: false,
      articleId: 0
    }))
    setType('normal')
  }

  // 举报类型：normal 不感兴趣或拉黑作者 | junk 垃圾内容
  const [type, setType] = useState('normal');
  // 点击不感兴趣的回调函数
  const unlike = async () => {
    // console.log("articleId=",feedbackAction.articleId);
    // console.log("channelId=",feedbackAction.channelId);
    await dispatch(unLikeArticle(feedbackAction.articleId, feedbackAction.channelId));
    onClose();
    Toast.show({ content: '拉黑成功' })
  }
  // 举报反馈的回调函数
  const report = async(id, title) => {
    await dispatch(reportArticle(feedbackAction.articleId,id));
    onClose();
    Toast.show({ content: '举报成功' });
  }

  return (
    <div className={styles.root}>
      <Modal
        className="more-action-modal"
        title=""
        transparent
        maskClosable
        footer={[]}
        onClose={onClose}
        visible={feedbackAction.visible}
      >
        <div className="more-action">
          {/* normal 类型时的菜单内容 */}
          {type === 'normal'?(
            <>
              <div className="action-item" onClick={unlike}>
                <Icon type="icon-close" /> 不感兴趣
              </div>
              <div className="action-item" onClick={() => setType('junk')}>
                <Icon type="icon-wentifankui" />
                <span className="text">反馈垃圾内容</span>
                <Icon type="icon-right" />
              </div>
              <div className="action-item">
                <Icon type="icon-lahei" /> 拉黑作者
              </div>
            </>
          )

          :(
            <>
              <div className="action-item" onClick={() => setType('normal')}>
                <Icon type="icon-fanhui" />
                <span className="back-text">反馈垃圾内容</span>
              </div>
              {
                list.map(item => (
                  <div key={item.id} className="action-item" onClick={() => report(item.id, item.title)}>{item.title}</div>
                ))
              }
              <div className="action-item">
                <span className="text">其他问题</span>
                <Icon type="icon-right" />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default FeedbackActionMenu