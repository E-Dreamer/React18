/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 10:20:13
 * @LastEditTime: 2022-08-05 10:37:47
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { RootState } from "@/store";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import LayoutMenu from './components/Menu'
import LayoutHeader from './components/Header'
import LayoutTabs from './components/Tabs'
import LayoutFooter from './components/Footer'
// useLocation
import { Outlet } from "react-router-dom";
import './index.scss'
import { updateCollapse } from "@/store/menu";
import { setAuthButtons } from "@/store/global";
import { useEffect } from "react";
import { getAuthorButtons } from "@/api/modules/login";
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
const LayoutIndex = (props: any) => {
  const { Sider, Content } = Layout;
  // const { pathname } = useLocation()
  const dispatch = useDispatch()
  const isCollapse = useSelector((state: RootState) => state.menu.isCollapse)

  // 获取按钮权限列表
  const getAuthButtonsList = async () => {
    const { data } = await getAuthorButtons();
    dispatch(setAuthButtons(data));
  };

  // 监听窗口大小变化
  const listeningWindow = () => {
    window.onresize = () => {
      return (() => {
        let screenWidth = document.body.clientWidth;
        if (!isCollapse && screenWidth < 1200) dispatch(updateCollapse(true));
        if (!isCollapse && screenWidth > 1200) dispatch(updateCollapse(false));
      })();
    };
  };

  useEffect(() => {
    listeningWindow();
    getAuthButtonsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="layout_container">
    <Sider trigger={null} collapsed={isCollapse} width={220} theme="dark">
      <LayoutMenu></LayoutMenu>
    </Sider>
    <Layout>
      <LayoutHeader></LayoutHeader>
      <LayoutTabs></LayoutTabs>
      <Content>
        {/* TransitionGroup 会导致 useEffect 加载两次 && 使用路由懒加载第一次进入没有动画，所以暂时不用过渡动画了 */}
        {/* <TransitionGroup className="content"> */}
        {/* exit：表示退出当前页面的时候是否有动画 */}
        {/* <CSSTransition key={pathname} timeout={200} classNames="fade" exit={false}> */}
        <Outlet></Outlet>
        {/* </CSSTransition> */}
        {/* </TransitionGroup> */}
      </Content>
      <LayoutFooter></LayoutFooter>
    </Layout>
  </div>
}

export default LayoutIndex;