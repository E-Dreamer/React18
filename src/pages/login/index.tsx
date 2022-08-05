/*
 * @Author: E-Dreamer
 * @Date: 2022-08-02 14:22:39
 * @LastEditTime: 2022-08-04 15:10:00
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import loginLeft from "@/assets/images/login_left.png";
import logo from "@/assets/images/logo.png";
import './index.scss'
import LoginForm from "./components/LoginForm";
export default function Login() {
  return <div className="login-container">
    <div className="login-box">
      <div className="login-left">
        <img src={loginLeft} alt="login" />
      </div>
      <div className="login-form">
        <div className="login-logo">
          <img className="login-icon" src={logo} alt="logo" />
          <span className="logo-text">后台管理系统</span>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
}
