import React from 'react';
import styles from './index.module.scss';
import Tabs from '@/components/Tabs';
import Icon from '@/components/Icon';
import Channels from './components/Channels';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChannels, getUserChannels } from '@/store/actions/home';
import { Drawer } from 'antd-mobile-v2';
import ArticleList from './components/ArticleList';
import FeedbackActionMenu from './components/FeedbackActionMenu';

export default function Home() {
  const dispatch = useDispatch();
  // 处理频道高亮
  const [active, setActive] = useState(0)
  const changeActive = (index) => {
    setActive(index)
  }

  // 控制抽屉组件
  // 控制频道管理抽屉的显示和隐藏
  const [drawerVisible, setDrawerVisible] = useState(false)
  const onClose = () => {
    setDrawerVisible(false)
  }
  // 获取用户频道，并存储在store中
  useEffect(() => {
    dispatch(getUserChannels());
  }, [])
  // 获取全部频道，并存储在store中
  useEffect(() => {
    dispatch(getAllChannels());
  }, [])
  const tabs = useSelector((state) => state.home.userChannels);
  return (
    <div className={styles.root}>
      <Tabs tabs={tabs} index={active} onChange={changeActive}>
        {/* 频道 Tab 对应的内容 */}
        {
          tabs.map(ch =>
            <ArticleList
              key={ch.id}
              channelId={ch.id}
            // aid={tabs[active].id}
            />
          )
        }
      </Tabs>

      {/* 频道 Tab 栏右侧的两个图标按钮：搜索、频道管理 */}
      <div className="tabs-opration">
        <Icon type="icon-search" />
        <Icon type="icon-more" onClick={() => setDrawerVisible(true)} />
      </div>
      {/* 频道管理抽屉 */}
      <Drawer className="my-drawer"
        children={''}
        sidebar={
          drawerVisible &&
          <Channels
            onClose={onClose}
            index={active}
            onChange={changeActive}
          />
        }
        open={drawerVisible}
      />
     <FeedbackActionMenu></FeedbackActionMenu>
    </div>
  )
}