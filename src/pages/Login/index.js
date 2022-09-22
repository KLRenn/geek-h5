import NavBar from '../../components/NavBar'
import styles from './index.module.scss'
import Input1 from '../../components/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { login, sendValidationCode } from '../../store/actions/login'
import { Toast /*  Input */ } from 'antd-mobile'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const [time, setTime] = useState(0)

  const doExtraClick = async () => {
    if (time > 0) return /* 倒计时结束才能使用 发送短信验证码 */
    // 点击发送验证码前先校验 mobile input 是否正确
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formik.setTouched({
        mobile: true,
      })
      return
    }
    try {
      await dispatch(sendValidationCode(mobile))
      Toast.show('获取验证码成功', 1)

      // 开启倒计时
      setTime(6)
      let timeId = setInterval(() => {
        // 当我们每次都想要获取到最新的状态，需要写成 箭头函数的形式
        setTime((time) => {
          if (time === 1) {
            clearInterval(timeId)
          }
          return time - 1
        })
      }, 1000)
    } catch (AxiosError) {
      /*  console.log(AxiosError) // 只能打印 AxiosError 整个对象
      // AxiosError 无法读取内部属性
      console.log(
        'doExtraClick>catch> AxiosError 无法读取AxiosError对象内部属性'
      )
      console.log('手动输出，发送验证码过于频繁')
      Toast.show(
        '(doExtraClick>catch> AxiosError 无法读取AxiosError对象内部属性)发送验证码过于频繁',
        1
      )
      console.log(AxiosError.responce.data) */
    }
    /* dispatch(sendValidationCode(mobile)) */
  }
  const onLeftClick = () => history.go(-1)
  const formik = useFormik({
    initialValues: {
      // 按照黑马http://geek.itheima.net/ 发布的验证码才能拿到
      mobile: '13811111111', //13911111111默认主账号，数据库中文章发布者,帐号可能被使用
      code: '246810', //
    },
    // 需要用 utils/request 代替 try/catch
    /**
     * 登录跳转
     * 在 AuthRoute组件 里记录拦截前的location于 from 属性
     */
    onSubmit: async (values) => {
      await dispatch(login(values))
      Toast.show('登录成功')
      const pathname = location.state ? location.state.from : '/home'
      const { state } = location
      if (!state) {
        history.replace('/home/index')
      } else {
        // 跳转回要访问的页面

        history.push(pathname)
      }
    },

    validate: (values) => {
      const errors = {}
      if (!values.mobile) {
        errors.mobile = '手机号不能为空'
      }
      if (!values.code) {
        errors.code = '验证码不能为空'
      }
      return errors
    },
    validationSchema: Yup.object().shape({
      // 表单验证
      // 手机号验证规则
      mobile: Yup.string()
        .required('请输入手机号')
        .matches(/^1[3-9]\d{9}$/, '手机号格式错误'),

      // 手机验证码验证规则
      code: Yup.string()
        .required('请输入验证码')
        .matches(/^\d{6}$/, '验证码6个数字'),
    }),
  })
  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isValid,
  } = formik
  return (
    <div className={styles.root}>
      <NavBar onLeftClick={onLeftClick} children={'登录'}></NavBar>
      <div className="content">
        {/* 标题 */}
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input1
              placeholder={mobile || '请输入手机号'}
              value={mobile}
              handleChange={handleChange}
              autoComplete="off"
              maxLength={11}
              name="mobile"
              handleBlur={handleBlur}
            ></Input1>

            {touched.mobile && errors.mobile ? (
              <div className="validate">{errors.mobile}</div>
            ) : null}
          </div>
          <div className="input-item">
            <Input1
              placeholder={code || '请输入验证码'}
              onExtraClick={doExtraClick}
              value={code}
              name="code"
              autoComplete="off"
              maxLength={6}
              extra={time === 0 ? '获取验证码' : time + 's后再获取'}
              onChange={handleChange}
              onBlur={handleBlur}
            ></Input1>
            {touched.code && errors.code ? (
              <div className="validate">{errors.code}</div>
            ) : null}
          </div>
          {/* 登录按钮 */}
          <button
            type="submit"
            className={classNames('login-btn', { disabled: !isValid })}
            disabled={!isValid}
          >
            <h4>登录</h4>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
