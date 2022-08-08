/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 15:05:06
 * @LastEditTime: 2022-08-08 16:03:47
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { RootState } from "@/store"
import { useSelector } from "react-redux"
import logo from "@/assets/images/logo.png";

const Logo = (props: any) => {
  const isCollapse = useSelector((state: RootState) => state.menu.isCollapse);
  return <div className="logo-box">
    <img src={logo} alt="logo" className="logo-img" />
    {!isCollapse ? <h2 className="logo-text">Admin</h2> : null}
  </div>
}

export default Logo