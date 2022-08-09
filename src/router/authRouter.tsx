/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 11:21:39
 * @LastEditTime: 2022-08-09 08:45:39
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { AxiosCanceler } from "@/api/helper/axiosCancel";
import { useLocation, Navigate } from "react-router-dom";
import { rootRouter } from '@/router/index'
import { searchRoute } from "@/utils";
import store from "@/store";
import { HOME_URL } from "@/config";

const toLogin = ()=>{
  return <Navigate to='/login' replace />
}
const toHome = ()=>{
  return <Navigate to={HOME_URL} replace />
}
const axiosCanceler = new AxiosCanceler();
const AuthRouter = (props: { children: JSX.Element }) => {
  const { pathname } = useLocation()

  const token = store.getState().global.token
  // * 处理 / 是跳login 还是home
  if (pathname === '/') {
    return token ? toHome() : toLogin()
  }
  if(pathname === '/login' && token){
    return toHome()
  }
  const route = searchRoute(pathname, rootRouter)

  // * 判断当前路由是否需要访问权限(不需要权限直接放行)
  if (!route.meta?.requiresAuth) return props.children;

  // * 判断是否有Token
  if (!token) {
    // * 在跳转路由之前，清除所有的请求
    axiosCanceler.removeAllPending();
    return toLogin()
  }
  // * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
  const dynamicRouter = store.getState().global.authRouter;
  // * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
  const staticRouter = [HOME_URL, "/404",];
  const routerList =  dynamicRouter.concat(staticRouter);
  // * 如果访问的地址没有在路由表中重定向到404页面
  // eslint-disable-next-line eqeqeq
  if (routerList.indexOf(pathname) == -1) return <Navigate to="/404" />;

  // * 当前账号有权限返回 Router，正常访问页面
  return props.children
}

export default AuthRouter