import styles from './index.module.scss';
import ArticleItem from '../ArticleItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleList, getMoreArticleList } from '@/store/actions/home';
import { PullToRefresh, InfiniteScroll } from 'antd-mobile';
/**
 * 文章列表组件
 * @param {String} props.channelId 当前文章列表所对应的频道ID
 * @param {String} props.aid 当前 Tab 栏选中的频道ID,高亮的频道id
 */
const ArticleList = ({ channelId, aid }) => {
    const res = useSelector((state) => state.home.articles[channelId])
    const dispatch = useDispatch();
    const onRefresh = () => {
        // 下拉刷新，需要重新加载最新的数据
        setHasMore(true);
        dispatch(getArticleList(channelId, Date.now()))
    }
    // 列表滚动到底部自动加载更多数据。
    // 是否有更多的数据
    const [hasMore, setHasMore] = useState(true);
    // 是否正在加载数据
    const [loading, setLoading] = useState(false)
    const loadMore = async () => {
        // // 如果不是当前频道，不加载数据
        if (channelId !== aid) return;
        // loading的处理
        if (loading) return;
        // 没有时间戳了，没有更多数据的处理
        if (!res.timestamp) {
            setHasMore(false)
            return;
        }
        setLoading(true)
        try {
            await dispatch(getMoreArticleList(channelId, res.timestamp))
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        // 如果redux中 有数据  不用发送请求
        if (res) return;
        if (channelId === aid) {
            dispatch(getArticleList(channelId, Date.now()))
        }
    }, [channelId, aid, dispatch])
    const { list } = res || []
    if (!res) return null

    return (
        <div className={styles.root}>
            <div className="articles">
                <PullToRefresh
                    onRefresh={onRefresh}
                >
                    {list.map((item) => (
                        <div className="article-item" key={item.art_id}>
                            <ArticleItem channelId={channelId} article={item}></ArticleItem>
                        </div>
                    ))}
                </PullToRefresh>
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </div>
        </div>
    )
}

export default ArticleList