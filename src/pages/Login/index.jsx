
import NavBar from '@/components/NavBar';
import Input from '@/components/Input';
import styles from './index.module.scss';
import { useFormik } from 'formik';
import classNames from 'classnames';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { sendValidationCode, login } from '@/store/actions/login'
import { Toast } from 'antd-mobile';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { getTokenInfo } from '@/utils/storage';

export default function Login() {
  const [time, setTime] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // 发送验证码
  const onExtraClick = async () => {
    // 如果验证码获取时间time>0，则不能点击获取验证码
    if (time > 0) return;
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formik.setTouched({
        mobile: true
      });
      return
    }
    await dispatch(sendValidationCode(mobile));
    Toast.show({
      icon: 'success',
      content: '获取验证码成功！',
    });
    // 开启定时器，60秒内不能重复获取验证码
    setTime(60);
    let timeId = setInterval(() => {
      // setTime(time-1);
      setTime(time => {
        if (time === 1) {
          clearInterval(timeId);
        }
        return time - 1;
      });
    }, 1000);
  };
  // yup校验手机号和验证码
  let validationSchema = Yup.object().shape({
    mobile: Yup.string().required('手机号不能为空!').matches(/^1[3-9]\d{9}$/, '请输入11位有效手机号!'),
    code: Yup.string().required('验证码不能为空!').matches(/^\d{6}$/, '请输入6位有效验证码!'),
  });
  //formik原生校验手机号和验证码
  // const validate = values => {
  //   const errors = {};
  //   if (!values.mobile) {
  //     errors.mobile = '手机号不能为空!';
  //   } else if (values.mobile.length != 11) {
  //     errors.mobile = '手机号必须为11位!';
  //   }

  //   if (!values.code) {
  //     errors.code = '验证码不能为空!';
  //   } else if (values.code.length != 6) {
  //     errors.code = '请输入6位有效验证码!';
  //   }

  //   return errors;
  // };
  const formik = useFormik({
    initialValues: {
      mobile: '13323551400',
      code: '246810'
    },
    // 表单提交
    onSubmit: async values => {
      await dispatch(login(values));
      Toast.show({ icon: 'success', content: '登录成功!' })
      // 跳转至进登录页前的页面，若没有跳转至首页home
      navigate(location.state?.path?location.state.path:'/home', {replace:true});
    },
    validationSchema,
  });
  // 解构formik属性方法
  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    isValid
  } = formik; 

  return (
    <div className={styles.root}>
      <NavBar>登录</NavBar>

      {/* 内容 */}
      <div className='content'>
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className='input-item'>
            <Input
              placeholder='请输入手机号'
              autoComplete='off'
              value={mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              name='mobile'
            />
            {formik.touched.mobile && formik.errors.mobile ? <div className='validate'>{formik.errors.mobile}</div> : null}
          </div>
          <div className='input-item'>
            <Input
              placeholder='请输入验证码'
              autoComplete='off'
              extra={time == 0 ? '发送验证码' : `${time}秒后获取`}
              onExtraClick={onExtraClick}
              value={code}
              onChange={handleChange}
              onBlur={handleBlur}
              name='code'
            />
            {formik.touched.code && formik.errors.code ? <div className='validate'>{formik.errors.code}</div> : null}
          </div>
          <button type='submit' className={classNames('login-btn', !isValid ? 'disabled' : null)}>登录</button>
        </form>

      </div>
    </div>
  )
}


