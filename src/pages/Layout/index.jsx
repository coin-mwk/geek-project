import React, { lazy, Suspense } from 'react';
import styles from './index.module.scss';
import Icon from '@/components/Icon';
import classNames from 'classnames';
import {
    useNavigate,
    useLocation,
    Route,
    Routes
} from 'react-router-dom';


const Home = lazy(() => import('@/pages/Home'));
const QA = lazy(() => import('@/pages/Qa'));
const Video = lazy(() => import('@/pages/Video'));
const Profile = lazy(() => import('@/pages/Profile'));

const tabBar = [
    {
        title: '首页',
        icon: 'icon-home',
        path: '/home'
    },
    {
        title: '问答',
        icon: 'icon-QA',
        path: '/home/qa'
    },
    {
        title: '视频',
        icon: 'icon-video',
        path: '/home/video'
    },
    {
        title: '我的',
        icon: 'icon-mine',
        path: '/home/profile'
    }
];
export default function Layout() {
    const naviate = useNavigate();
    const location = useLocation()

    return (
        <div className={styles.root}>
            {/* 区域一：点击按钮切换显示内容的区域 */}
            <div className="tab-content">
                {/* 配置二级路由 */}
                <Suspense fallback={<div>loading.....</div>}>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/video" element={<Video />}></Route>
                        <Route path="/qa" element={<QA />}></Route>
                        <Route path="/profile" element={<Profile />}></Route>
                    </Routes>
                </Suspense>
            </div>

            {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
            {/* 判断当前页面路径和按钮路径是否一致，如果一致则表示该按钮处于选中状态  item.path === location.pathname*/}

            <div className='tabbar'>
                {tabBar.map(item => (
                    <div
                        className={classNames('tabbar-item', item.path === location.pathname ? 'tabbar-item-active' : '')}
                        key={item.title}
                        onClick={() => naviate(item.path)}
                    >
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
