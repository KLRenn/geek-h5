import NavBar from '../../../components/NavBar'
import {
  List,
  Avatar,
  Button,
  Popup,
  Toast,
  TextArea,
  Modal,
} from 'antd-mobile'
import { useHistory, Link } from 'react-router-dom'
import styles from './index.module.scss'
import img from './logo192.png'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import {
  getProfile,
  saveProfile,
  updateProfile,
  updateAvatar,
  logout,
} from '../../../store/actions/profile'
import EditInput from './components/EditInput'
import Actionsheet from './components/EditList'
import Datepicker from '../../../components/Datepicker'

/* const { Item } = List */
const ProfileEdit = () => {
  const fileRef = useRef()
  const history = useHistory()
  const dispatch = useDispatch()

  const onBirthdayChange = (value) => {
    console.log('value', value)
    const date = `${value.getFullYear()}-${
      value.getMonth() + 1
    }-${value.getDate()}`
    console.log('date', date)

    dispatch(updateProfile('birthday', date))
  }

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])
  const onClose = () => {
    setV1({
      visible1: false,
      visible3: false,
      type: 'name',
      val1: name,
      val2: mobile,
    })
    setOpenList({
      visible: false,
      type: 'gender',
    })
  }

  const userProfile = useSelector((state) => state.profile.profile || {})
  const { id, photo, name, gender, birthday, mobile, intro } = {
    ...userProfile,
  }
  /* console.log({ id, photo, name, gender, birthday, mobile }) */
  const [v1, setV1] = useState({
    visible1: false /* 控制 Popup 全屏弹出抽屉 */,
    visible3: false /* 控制日期 Datepicker */,
    title: '',
    type: '',
    birthday: birthday,
  })

  const [openList, setOpenList] = useState({ visible: false, type: 'gender' })

  const userConfig =
    v1.type === 'name'
      ? { title: '昵称', type: 'name', value: name }
      : { title: '简介', type: 'intro', value: intro || mobile }

  const onCommit = (type, value) => {
    // 调用 Action 更新数据
    dispatch(updateProfile(type, value))
    // 关闭抽屉
    onClose()
  }

  /*
const actions: Action[] = [
    { text: '拍照', key: 'photograph' },
    { text: '本地选择', key: 'fromlocal' },
    {
      text: '取消',
      key: 'cancel',
      onClick: async () => {
        const result = await Dialog.confirm({ content: '确定要保存吗？' })
        if (result) {
          Toast.show('执行了保存操作')
        }
      },
    },
  ]
*/

  const onAvatarChange = (e) => {
    // 获取选中的图片文件
    const file = e.target.files[0]

    // 生成表单数据
    const formData = new FormData()
    formData.append('photo', file)

    // 调用 Action 进行上传和 Redux 数据更新
    dispatch(updateAvatar(formData))

    Toast.success('头像上传成功')
    onClose()
  }

  const userListConfig =
    openList.type === 'avatar'
      ? [
          {
            text: '拍照',
            key: 'photo',
            onClick: () => {
              fileRef.current.click()
            },
          },
          {
            text: '本地选择',
            key: 'fromlocal',
            onClick: () => {
              fileRef.current.click()
            },
          },
          {
            text: '取消',
            key: 'cancel',
            onClose: () => {
              onClose()
            },
          },
        ]
      : [
          {
            text: '男',
            key: '0',
            onClick: () => {
              onCommit('gender', 0)
            },
          },
          {
            text: '女',
            key: '1',
            onClick: () => {
              onCommit('gender', 1)
            },
          },
          {
            text: '取消',
            key: 'cancel',
            onClose: () => {
              onClose()
            },
          },
        ]

  const timeparse = (val) => {
    /* function parseDate(val) {
  var parts = val.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
} */
    let date = new Date(val)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    const time = `${y}-${m}-${d}`
    return time
  }

  const onLogout = () => {
    // 弹出确认对话框
    Modal.show({
      content: '温馨提示,你确定退出吗？',
      closeOnAction: true,
      actions: [
        // 取消按钮
        { text: '取消', key: 'cancel' },
        // 确认按钮
        {
          text: '确认',
          key: 'confirm',
          style: { color: '#FC6627' },
          onClick: () => {
            // 删除 Token 信息
            dispatch(logout())
            Toast.show('已退出登录')
            // 跳转到登录页
            history.replace('/login')
          },
        },
      ],
    })
  }

  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部导航栏 */}
        <NavBar onLeftClick={() => history.go(-1)}>个人信息</NavBar>
        <div className="linkto">
          <Link to="/login">登录</Link>
        </div>
        <div className="wrapper">
          {/* 头像 */}
          <List className="profile-list">
            <List.Item
              onClick={() => {
                setOpenList({ visible: true, type: 'avatar' })
              }}
              extra={
                <span>
                  <Avatar src={photo} />
                </span>
              }
            >
              头像
            </List.Item>
            {/* 昵称 Popup ------------------------------------------------------*/}
            <List.Item
              className="intro normal"
              onClick={() => {
                setV1({
                  visible1: true,
                  title: '昵称',
                  type: 'name',
                  val1: name,
                })
              }}
              extra={
                <div>{name || '请输入昵称'}</div>
              } /* 往 EditInput（内有 input , textarea 需要选择性使用）
              传入 type , val
              type：值为 name 时，显示 input; 值为 intro 时, 显示 textarea
              val: 显示 input 时，传入 name 昵称对应值;显示 textarea 时，传入 mobile 简介对应值

              */
            >
              昵称
            </List.Item>
            {/* 简介 Popup ---------------------------------------------------*/}
            <List.Item
              className="intro normal"
              onClick={() => {
                setV1({
                  visible1: true,
                  title: '简介',
                  type: 'intro',
                })
              }}
              extra={<div>{intro || '请输入简介'}</div>}
            >
              简介
            </List.Item>
          </List>

          {/* 性别 ----------------------------------------------------*/}
          <List className="profile-list">
            <List.Item
              onClick={() => {
                setOpenList({ visible: true, type: 'gender' })
              }}
              extra={<span>{gender === 0 ? '男' : '女'}</span>}
            >
              性别
            </List.Item>
            {/* 生日 List.Item  Datepicker ------------------------------*/}
            <List.Item
              onClick={() => {
                setV1({
                  visible3: true,
                  type: 'name',
                  val1: name,
                  val2: mobile,
                  birthday: birthday,
                })
              }}
              extra={
                <span className="adm-list-item-content-main">
                  {v1.birthday || birthday || '选择日期'}
                  <Datepicker
                    visible={v1.visible3}
                    onClose={onClose}
                    birthday={birthday}
                    onCommit={onBirthdayChange}
                  ></Datepicker>
                </span>
              }
            >
              生日
            </List.Item>
          </List>

          {/* 文件选择框，用于头像图片的上传 */}
          <input type="file" hidden ref={fileRef} onChange={onAvatarChange} />
        </div>

        {/* 底部栏：退出登录按钮 */}
        <div className="logout">
          <button className="btn" onClick={onLogout}>
            {name ? '退出登录' : '未登录'}
          </button>
        </div>

        <Popup
          mask="false"
          position="right"
          visible={v1.visible1}
          bodyStyle={{
            minHeight: document.documentElement.clientHeight,
            backgroundColor: '#fff',
            overflow: 'auto',
          }}
        >
          {v1.visible1 && (
            <EditInput
              userConfig={userConfig}
              onClose={onClose}
              onCommit={onCommit}
            ></EditInput>
          )}
        </Popup>
        <Actionsheet
          onClose={onClose}
          visible={openList.visible}
          actions={userListConfig}
          type={openList.type}
          onCommit={onCommit}
        />
      </div>
    </div>
  )
}

export default ProfileEdit
