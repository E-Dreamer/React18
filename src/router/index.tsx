/*
 * @Author: E-Dreamer
 * @Date: 2022-08-03 11:01:46
 * @LastEditTime: 2022-08-08 09:30:49
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { RouteObject } from '@/config/interface';
//  Route, Routes,
import { Navigate, useRoutes } from "react-router-dom";
import React from 'react'
import LayoutIndex from '@/layout';
import { useSelector } from 'react-redux';
import { LAYOUT_KEY } from '@/config';

const Login = React.lazy(() => import('@/pages/login'))
const Home = React.lazy(() => import('@/pages/home'))
const NoFound = React.lazy(() => import('@/pages/404'))
const Ceshi = React.lazy(() => import('@/pages/ceshi'))

//* 加载组件
const lazyLoad = (path?: string) => {
  return path ? React.lazy(() => import(`@/pages/${path}`)) : ''
}
const routeItem = (item: BackStageRoute) => {
  return {
    element: lazyLoad(item.components),
    path: item.path,
    meta: item.meta,
    key: item.meta?.key,
    icon: item.icon,
    isLink: item.isLink,
    children: []
  }
}

// 寻找数组
const findCom = (arr: any[], key?: string): BackStageRoute => {
  let result: BackStageRoute = {}
  for (let item of arr) {
    if (item.key === key) return item;
    if (item.children) {
      const res = findCom(item.children, key);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
}
/**
 * @description: 处理后台返回的路由
 * @param {BackStageRoute} routerList
 * @param {any} newArr
 * @return {*}
 */
export function filterAllRoutes(routerList: BackStageRoute[], newArr: any[] = []) {
  routerList.forEach((item) => {
    if (item.parent) {
      let parent = findCom(newArr, item.parent)
      if (!Object.keys(parent).length) {
        newArr.push({
          element: item.parent === LAYOUT_KEY ? <LayoutIndex /> : lazyLoad(item.parent),
          key: item.parent,
          children: []
        })
        let parent = findCom(newArr, item.parent)
        parent.children?.push(routeItem(item))
      }
      parent.children?.push(routeItem(item))
    } else {
      newArr.push(routeItem(item))
    }
    if (item.children) {
      return filterAllRoutes(item.children, newArr)
    }
  })
  return newArr
}
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
      },
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
};
export default Router