import NavBar from '@/components/NavBar';
import styles from './index.module.scss';
import Image from '@/components/Image';

const Video = () => {
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar>视频</NavBar>

      {/* 视频列表 */}
      <div className="video-list">
        <div className="video-item">
          <h3 className="title">格力电器将继续发展手机业务，并将向全产业覆盖！</h3>
          <div className="play">
            <video src="https://ips.ifeng.com/video19.ifeng.com/video09/2021/05/26/p6803231351488126976-102-8-161249.mp4?reqtype=tsl&vid=2c791e3b-444e-4578-83e3-f4808228ae3b&uid=0puFR4&from=v_Free&pver=vHTML5Player_v2.0.0&sver=&se=&cat=&ptype=&platform=pc&sourceType=h5&dt=1622096387396&gid=6a4poXmsep1E&sign=39f76885daca6503ebf90acbfffc1ff1&tm=1622096387396"></video>
          </div>
          <span>1563次播放</span>
        </div>

        <div className="video-item">
          <h3 className="title">你用上5G了吗？我国5G手机终端达3.1亿 占全球比例超80％</h3>
          <div className="play">
            <video src="https://ips.ifeng.com/video19.ifeng.com/video09/2021/05/26/p6803268684325330944-102-8-184104.mp4?reqtype=tsl&vid=ec74b1e4-d1fa-488b-aaf5-71984ca7d13e&uid=1Vun5L&from=v_Free&pver=vHTML5Player_v2.0.0&sver=&se=&cat=&ptype=&platform=pc&sourceType=h5&dt=1622096310639&gid=fg3vsXmseXFv&sign=38e7c790561e1fd1b57e61a1cbd8031c&tm=1622096310639"></video>
          </div>
          <span>1563次播放</span>
        </div>
      </div>
      <div style={{'height':'400px'}}></div>
      <Image src="https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60" alt="" />
    </div>
  )
}

export default Video
