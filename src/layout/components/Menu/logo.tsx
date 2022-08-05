import { RootState } from "@/store"
import { connect } from "react-redux"

/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 15:05:06
 * @LastEditTime: 2022-08-04 15:32:39
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import logo from "@/assets/images/logo.png";
const Logo = (props: any) => {
  const { isCollapse } = props;
  return <div className="logo-box">
    <img src={logo} alt="logo" className="logo-img" />
    {!isCollapse ? <h2 className="logo-text">Hooks Admin</h2> : null}
  </div>
}
//两种方式获取 store state 该种方式props中可以获取
const mapStateToProps = (state: RootState) => state.menu
export default connect(mapStateToProps)(Logo)