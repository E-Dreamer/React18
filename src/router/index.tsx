/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: E-Dreamer
 * @Date: 2022-08-03 11:01:46
 * @LastEditTime: 2023-03-21 14:17:52
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { RouteObject } from '@/config/interface';
import { Navigate, useRoutes } from "react-router-dom";
import React, {  useEffect, useState } from 'react'
import LayoutIndex from '@/layout';
import { LAYOUT_KEY } from '@/config';

import { getBackRoutes } from '@/api/modules/menu';
import { useDispatch, useSelector } from 'react-redux';
import { setRouteData, setAllRouter ,fetchAllRouters} from '@/store/route';
import { changeRoute } from '@/utils'

const Login = React.lazy(() => import('@/pages/login'))
const Home = React.lazy(() => import('@/pages/home'))
const NoFound = React.lazy(() => import('@/pages/404'))
// const Ceshi = React.lazy(() => import('@/pages/ceshi'))

//* 加载组件
const lazyLoad  = (path: string) => {
  return React.lazy(() => import(`@/pages/${path}`))
}
const routeItem = (item: BackStageRoute) => {
  return {
    element: item.components && React.createElement(lazyLoad(item.components)),
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
          element: item.parent === LAYOUT_KEY ? <LayoutIndex /> : React.createElement(lazyLoad(item.parent)),
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
      // {
      //   path: '/ceshi',
      //   element: <Ceshi />,
      //   meta: {
      //     requiresAuth: true,
      //     title: "测试",
      //     key: "ceshi"
      //   }
      // },
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
const Router = (props: any) => {
  // const { backRoutes } = props;
  const [backRoutes, setBackRoutes] = useState<RouteObject[]>([])
  const dispatch = useDispatch()
  // const routerData:RouteObject[] = useSelector((state:any)=>state.route.routerData)

  // 获取后端路由
  const getRoutes = async () => {
    try {
      // dispatch(fetchAllRouters())
      // dispatch(setAllRouter([...routerData,...rootRouter]))
      // setBackRoutes(routerData)
      const { data } = await getBackRoutes()
      console.log('data: ', data);
      if (!data) return;
      dispatch(setRouteData(data))
      const result = changeRoute(filterAllRoutes(data))
      console.log('后端返回的路由: ', result);
      dispatch(setAllRouter([...result, ...rootRouter]))
      setBackRoutes(result)
    } catch (err) {
      // console.log(err)
    }
  }
  const token = useSelector((state: any) => state.global.token)
  useEffect(() => {
    token && getRoutes()
  }, [token])
  const all = [...backRoutes, ...rootRouter]
  const routes = useRoutes(all);
  return routes
};
export default Router