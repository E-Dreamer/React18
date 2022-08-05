/*
 * @Author: E-Dreamer
 * @Date: 2022-08-03 11:01:46
 * @LastEditTime: 2022-08-05 11:51:17
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { RouteObject } from '@/config/interface';
//  Route, Routes,
import { Navigate, useRoutes } from "react-router-dom";
import React from 'react'
import LayoutIndex from '@/layout';

const Login = React.lazy(() => import('@/pages/login'))
const Home = React.lazy(() => import('@/pages/home'))
const NoFound = React.lazy(() => import('@/pages/404'))
const Ceshi = React.lazy(() => import('@/pages/ceshi'))
export const rootRouter: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: "login"
    }
  },
  {
    element: <LayoutIndex />,
    children: [
      {
        path: '/home',
        element: <Home />,
        meta: {
          requiresAuth: true,
          title: "首页",
          key: "home"
        }
      },
      {
        path: '/ceshi',
        element: <Ceshi />,
        meta: {
          requiresAuth: true,
          title: "测试",
          key: "ceshi"
        }
      }
    ]
  },
  {
    path: '/404',
    element: <NoFound />,
    meta: {
      title: "404",
      key: '404',
      requiresAuth: false
    }
  },
  {
    path: "*",
    element: <Navigate to="/404" />
  }
]
const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes
  // const token = getToken()
  // const isLoginOrHome = () => {
  //  return token ? <Navigate to='/login' replace /> : <Navigate to='/home' replace />
  // }
  // return (
  //   <>
  //     <Routes>
  //       <Route path='/' element={isLoginOrHome()} />
  //     </Routes>
  //     {routes}
  //   </>
  // )
};
export default Router