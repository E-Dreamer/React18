/*
 * @Author: E-Dreamer
 * @Date: 2022-08-02 14:22:39
 * @LastEditTime: 2022-08-03 14:39:19
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import loginLeft from "@/assets/images/login_left.png";
import logo from "@/assets/images/logo.png";
import style from './index.module.scss'
export default function Login() {
  return <div className={style.login_container}>
  <div className={style.login_box}>
    <div className={style.login_left}>
      <img src={loginLeft} alt="login" />
    </div>
    <div className={style.login_form}>
      <div className={style.login_logo}>
        <img className={style.login_icon} src={logo} alt="logo" />
        <span className={style.logo_text}>后台管理系统</span>
      </div>
      {/* <LoginForm /> */}
    </div>
  </div>
</div>
}
