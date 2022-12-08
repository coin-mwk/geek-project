import Icon from '@/components/Icon';
import styles from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import differenceBy from 'lodash/differenceBy';
import classNames from 'classnames';
import { useState } from 'react';
import { addChannel, delChannel } from '@/store/actions/home';
import { Toast } from 'antd-mobile';


/**
 * 频道管理组件
 * @param {Number} props.tabActiveIndex 用户选中的频道的索引
 * @param {Function} props.onClose 关闭频道管理抽屉时的回调函数
 * @param {Function} props.onChannelClick 当点击频道列表中的某个频道时的会带哦函数
 */
const Channels = ({ index, onClose, onChange }) => {
    const dispatch = useDispatch();
    const onAddChannel = channel => {
        // 调用 Action 来添加频道
        dispatch(addChannel(channel));
    }
    const onDeleteChannel = (channel,i) => {
        // 调用 Action 来删除频道
        if (userChannels.length <= 4) {
            Toast.show({ content: "至少保留四个频道!" });
            return;
        }
        // 修改高亮
        // 如果删除的i和index相等，默认让推荐0高亮
        // 如果删除的i小于index，默认让i-1高亮
        // 如果删除的i大于index，不用处理，默认i高亮
        dispatch(delChannel(channel));
        if (i === index) {
            onChange(0);
        } else if (i < index) {
            onChange(index - 1);

        } 
    }
    // 控制普通/编辑模式的状态
    const [editable, setEditable] = useState(false);
    const userChannels = useSelector((state) => state.home.userChannels);
    const optionChannels = useSelector((state) => {
        // 推荐频道 = 所有频道 - 我的频道
        const { userChannels, allChannels } = state.home;
        return differenceBy(allChannels, userChannels, 'id')
    })
    const changeChannel = (i) => {

    }

    return (
        <div className={styles.root}>
            {/* 顶部栏：带关闭按钮 */}
            <div className="channel-header">
                <Icon type="icon-close" onClick={onClose} />
            </div>

            {/* 频道列表 */}
            <div className="channel-content">
                {/* 当前已选择的频道列表 */}
                <div className={classNames('channel-item', editable ? 'edit' : '')}>
                    <div className="channel-item-header">
                        <span className="channel-item-title">我的频道</span>
                        <span className="channel-item-title-extra">
                            {editable ? '点击删除频道' : '点击进入频道'}
                        </span>
                        <span className="channel-item-edit" onClick={() => setEditable(!editable)}>
                            {editable ? '保存' : '编辑'}
                        </span>
                    </div>


                    {/* 我的频道 */}
                    <div className="channel-list">
                        {userChannels.map((item, i) => (
                            <span
                                className={classNames('channel-list-item', {
                                    selected: index === i,
                                })}
                                key={item.id}
                                onClick={() => {
                                    // 如果是编辑状态，不允许跳转
                                    if (editable) return
                                    onChange(i);
                                    // 关闭弹层
                                    onClose()
                                }}
                            >
                                {item.name}
                                {
                                    item.id !== 0 && <Icon type="icon-close" onClick={() => onDeleteChannel(item,i)} />
                                }
                            </span>
                        ))}
                    </div>
                </div>

                {/* 推荐的频道列表 */}
                <div className="channel-item">
                    <div className="channel-item-header">
                        <span className="channel-item-title">频道推荐</span>
                        <span className="channel-item-title-extra">点击添加频道</span>
                    </div>
                    <div className="channel-list">
                        {optionChannels.map((item) => (
                            <span
                                className="channel-list-item"
                                key={item.id}
                            // 添加频道
                            onClick={() => onAddChannel(item)}
                            >
                                + {item.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Channels