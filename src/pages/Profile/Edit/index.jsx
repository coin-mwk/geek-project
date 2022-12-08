import Navbar from '@/components/NavBar'
import React, { useEffect, useRef, useState } from 'react'
import { List, Toast, Dialog} from 'antd-mobile'
import { Drawer,DatePicker } from 'antd-mobile-v2'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, updateProfile } from '@/store/actions/profile'
import classNames from 'classnames'
import EditInput from './components/EditInput/index1'
import EditList from './components/EditList'
import dayjs from 'dayjs' 
import { logout } from '@/store/actions/login'

const { Item } = List
export default function ProfileEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileRef = useRef(null);

  // 控制全屏抽屉的显示与隐藏
  const [open, setOpen] = useState({
    visible: false,
    type: ''
  })

  // 控制列表抽屉的显示与隐藏
  const [listOpen, setListOpen] = useState({
    visible: false,
    type: ''
  })

  const onClose = () => {
    setOpen({
      visible: false,
      type: ''
    })
    // setListOpen({
    //   visible: false,
    //   type: ''
    // })
  }

//   const onFileChange = async e => {
//     //  获取文件
//     const file = e.target.files[0]
//     // console.log(e)
//     const fd = new FormData()

//     // 上传文件
//     fd.append('photo', file)
//     await dispatch(updatePhoto(fd))

//     Toast.success('图片上传成功')
//     onClose()
//   }

//   const onBirthdayChange = e => {
//     // console.log(e)
//     onCommit('birthday', dayjs(e).format('YYYY-MM-DD'))
//   }

//   const config = {
//     photo: [
//       {
//         title: '拍照',
//         onClick: () => {
//           console.log('拍照')
//         }
//       },
//       {
//         title: '本地选择',
//         onClick: () => {
//           // console.log('本地选择')
//           // 触发点击事件
//           fileRef.current.click()
//         }
//       }
//     ],
//     gender: [
//       {
//         title: '男',
//         onClick: () => {
//           // console.log('男')
//           // dispatch(updateProfile({ gender: 0 }))
//           onCommit('gender', 0)
//         }
//       },
//       {
//         title: '女',
//         onClick: () => {
//           // console.log('女')
//           // dispatch(updateProfile({ gender: 1 }))
//           onCommit('gender', 1)
//         }
//       }
//     ]
//   }

  const logoutFn = () => {
    // 1.显示弹窗
    Dialog.confirm({
      content: '确定要退出吗？',
      onConfirm: async () => { 
        dispatch(logout());
        Toast.show({icon:'success',content:'退出成功!'});
        // 跳转到登录页
        navigate('/login', {replace:true});
      },
    })
    // Modal.alert('温馨提示', '确定要退出吗？', [
    //   { text: '取消' },
    //   {
    //     text: '确定',
    //     style: { color: '#FC6627' },
    //     onPress: () => {
    //       // console.log('话好好说')
    //       dispatch(logout())
    //       history.push('/login')
    //       Toast.success('退出登录成功')
    //     }
    //   }
    // ])
    // 2.删除token（本地和redux）
    // 3.跳转到登录页
  }
  useEffect(() => {
    // 发送请求，获取数据
    dispatch(getProfile());
  }, [dispatch]);

  // 获取redux中的数据
  const profile = useSelector(state => state.profile.profile);

//   const onCommit = async (type, value) => {
//     // console.log(type, value)
//     await dispatch(
//       updateProfile({
//         [type]: value
//       })
//     )
//     Toast.success('修改成功', 1, null, false)
//     onClose()
//   }

  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部导航栏 */}
        <Navbar onClick={() => navigate(-1)}>个人信息</Navbar>

        {/* 中间内容区域 */}
        <div className="wrapper">
          {/* 列表一：显示头像、昵称、简介 */}
          <List className="profile-list">
            <Item
            //   arrow="horizontal"
              extra={
                <span className="avatar-wrapper">
                  <img src={profile.photo} alt="" />
                </span>
              }
              onClick={() => {
                // setListOpen({
                //   visible: true,
                //   type: 'photo'
                // })
              }}
            >
              头像
            </Item>

            <Item
            //   arrow="horizontal"
              extra={profile.name}
              onClick={() => {
                // console.log(111)
                setOpen({
                  visible: true,
                  type: 'name'
                })
              }}
            >
              昵称
            </Item>

            <Item
            //   arrow="horizontal"
              extra={
                <span className={classNames('intro', profile.intro ? 'normal' : '')}>{profile.intro || '未填写'}</span>
              }
              onClick={() => {
                setOpen({
                  visible: true,
                  type: 'intro'
                })
              }}
            >
              简介
            </Item>
          </List>

          {/* 列表二：显示性别、生日 */}
          <List className="profile-list">
            <Item
            //   arrow="horizontal"
              extra={profile.gender === 0 ? '男' : '女'}
              onClick={() => {
                // setListOpen({
                //   visible: true,
                //   type: 'gender'
                // })
              }}
            >
              性别
            </Item>
            <DatePicker
              mode="date"
              title="选择年月日"
              value={new Date(profile.birthday)}
              minDate={new Date('1950-01-01')}
              maxDate={new Date()}
            //   onChange={onBirthdayChange}
            >
              <Item 
                // arrow="horizontal" 
                extra={'2020-02-02'}>
                生日
              </Item>
            </DatePicker>
          </List>

          {/* 文件选择框，用于头像图片的上传 */}
          {/* <input type="file" hidden /> */}
        </div>

        {/* 上传图片 */}
        {/* <input type="file" hidden ref={fileRef} onChange={onFileChange} /> */}

        {/* 底部栏：退出登录按钮 */}
        <div className="logout">
          <button className="btn" onClick={logoutFn}>
            退出登录
          </button>
        </div>
      </div>
{/* 
      {/* 全屏抽屉组件 */}
      {/* <Drawer
        sidebar={open.visible&&<EditInput onClose={onClose} type={open.type} />}
        // sidebar={''}
        open={open.visible}
        className="drawer"
        position="right"
      >
        {''}
      </Drawer> */}

      {/* 列表抽屉组件 */}
      {/* 头像、性别 */}
      {/* <Drawer
        className="drawer-list"
        position="bottom"
        sidebar={listOpen.visible && <EditList config={config} onClose={onClose} type={listOpen.type}></EditList>}
        open={listOpen.visible}
        onOpenChange={onClose}
      >
        {''}
      </Drawer> */}
    </div>
  )
}
