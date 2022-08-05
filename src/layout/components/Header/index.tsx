
/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 15:50:49
 * @LastEditTime: 2022-08-04 17:05:42
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { Layout } from "antd"
import AvatarIcon from "./components/AvatarIcon";
import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
import AssemblySize from "./components/AssemblySize";
import Language from "./components/Language";
import Theme from "./components/Theme";
import Fullscreen from "./components/Fullscreen";
import "./index.scss";

const LayoutHeader = () => {
  const { Header } = Layout;
  return <Header>
    <div className="header-lf">
      <CollapseIcon />
      <BreadcrumbNav />
    </div>
    <div className="header-ri">
      <AssemblySize />
      <Language />
      <Theme />
      <Fullscreen />
      <span className="username">Hooks</span>
      <AvatarIcon />
    </div>
  </Header>
}
export default LayoutHeader