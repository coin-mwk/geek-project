import Icon from '@/components/Icon';
import Input from '@/components/Input';
import NavBar from '@/components/NavBar';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import io from 'socket.io-client';
import { Toast } from 'antd-mobile';
import { getTokenInfo } from '@/utils/storage';

const Chat = () => {
    const clientRef = useRef(null);
    const listRef = useRef(null);
    const navigate = useNavigate();
    const [messageList, setMessageList] = useState([
        { type: 'robot', text: '亲爱的用户您好，小智同学为您服务！' },
        { type: 'user', text: 'hello！' },
    ]);
    const [msg, setMsg] = useState('');
    const photo = useSelector(state => state.profile.user.photo);
    useEffect(() => {
        // 创建客户端实例
        const client = io('http://toutiao.itheima.net', {
            transports: ['websocket'],
            // 在查询字符串参数中传递 token
            query: {
                token: getTokenInfo().token
            }
        });

        // 监听连接成功的事件
        client.on('connect', () => {
            // 向聊天记录中添加一条消息
            // Toast.show({icon:'success',content:'连接服务器成功，开始聊天吧!'});
            setMessageList(messageList => [
                ...messageList,
                { type: 'robot', text: '我现在恭候着您的提问。' }
            ]);
        });

        // 监听收到消息的事件
        client.on('message', data => {
            setMessageList(messageList=>{
                return [
                ...messageList,
                {
                    type:'robot',
                    text:data.msg
                }
            ]})
        })

        // 将客户端实例缓存到 ref 引用中
        clientRef.current = client;

        // 在组件销毁时关闭 socket.io 的连接
        return () => {
            client.close();
        }
    }, []);
    useEffect(() => {
        // 当messageList发生变化 就会执行
        // 让滚动条 滑动到最下面
        listRef.current.scrollTop = listRef.current.scrollHeight - listRef.current.offsetHeight
      }, [messageList])
    const onKeyDown = (e)=>{
        if(e.keyCode !== 13) return;
        if(!e.target.value) return;
        // 回车的时候， 需要给服务器发送消息  把自己的消息添加到消息队列中
        setMessageList([
            ...messageList,
            {
                type:'user',
                text:msg
            }
        ]);
        clientRef.current.emit('message',{
            msg,
            timestamp:Date.now()
        })
        // 清空消息
        setMsg('');
    };
    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar className="fixed-header" onLeftClick={() => navigate(-1)}>
                小智同学
            </NavBar>

            {/* 聊天记录列表 */}
            <div className="chat-list" ref={listRef}>
                {
                    messageList.map((item, index) => {
                        if (item.type === 'robot') {
                            {/* 机器人的消息 */ }
                            return (
                                <div className="chat-item" key={index}>
                                    <Icon type="icon-kefu1" />
                                    <div className="message">{item.text}</div>
                                </div>)
                        } else {
                            {/* 用户的消息 */ }
                            return (
                                <div className="chat-item user" key={index}>
                                    <img src={photo || 'http://toutiao.itheima.net/images/user_head.jpg'} alt="" />
                                    <div className="message">{item.text}</div>
                                </div>)
                        }
                    })
                }
            </div>

            {/* 底部消息输入框 */}
            <div className="input-footer">
                <Input
                    className="no-border"
                    placeholder="请描述您的问题"
                    value={msg}
                    onChange = {(e)=>setMsg(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <Icon type="iconbianji" />
            </div>
        </div>
    )
}

export default Chat