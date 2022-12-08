import { useDispatch, useSelector } from "react-redux";
import styles from './index.module.scss';
import classnames from "classnames";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import dayjs from "dayjs";
// 导入dayjs中文包
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import { setFeedbackAction } from "@/store/actions/home";
// 扩展dayjs，使其具有显示相对时间的功能
dayjs.extend(relativeTime);
dayjs.locale('zh-cn')



export default function ArticleItem({ article,channelId }) {
  const dispatch = useDispatch();
  const {
    cover: { type, images },
    title,
    aut_name,
    comm_count,
    pubdate,
  } = article;
  const isLogin = useSelector((state) => !!state.login.token);
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 ? 't3' : '',
          type === 0 ? 'none-mt' : ''
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => (
              <div className="article-img-wrapper" key={i}>
                <Image src={item} alt="" />
                {/* <img src={item} alt="" /> */}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>Leo Fitz</span>
        {/* aut_name信息被篡改，用Leo Fitz替换 */}
        {/* <span>{aut_name}</span> */}
        <span>{comm_count} 评论</span>
        {/* <span>{pubdate}</span> */}
        <span>{dayjs(pubdate).fromNow()}</span>


        {/* 只有登录用户可以举报反馈 */}
        {!!isLogin && (
          <span className="close" onClick={e => {
            // 防止事件穿透
            e.stopPropagation()
            // 调用传入的回调函数，并将当前文章ID作为参数传出
          }}>
            <Icon type="icon-close2" onClick={()=>dispatch(setFeedbackAction({
              visible:true,
              articleId:article.art_id,
              channelId
            }))}/>
          </span>
        )}

      </div>
    </div>
  )
}