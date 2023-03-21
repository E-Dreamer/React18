/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 15:02:30
 * @LastEditTime: 2022-08-10 16:08:14
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { RootState } from '@/store';
import { setBreadcrumbList } from '@/store/breadcrumb';
import { setAuthRouter } from '@/store/global';
import { setMenuList as setMenuListAction } from '@/store/menu';
import { Spin, Menu, MenuProps } from 'antd';
import * as Icons from "@ant-design/icons";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { changeMenu, findAllBreadcrumb, getOpenKeys, handleRouter, searchRoute } from '@/utils'
import Logo from './logo'
import { getMenuList } from '@/api/modules/menu';
import './index.scss'
import { BASE_MENU } from '@/config';

const LayoutMenu = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  const isCollapse = useSelector((state: RootState) => state.menu.isCollapse);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  // 刷新页面菜单保持高亮
  useEffect(() => {
    setSelectedKeys([pathname]);
    !isCollapse && setOpenKeys(getOpenKeys(pathname));
  }, [pathname, isCollapse]);

  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };
  // 定义 menu 类型
  type MenuItem = Required<MenuProps>["items"][number];
  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem;
  };
  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    return React.createElement(customIcons[name]);
  };

  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
    menuList.forEach((item: Menu.MenuOptions) => {
      // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
      if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
      newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)));
    });
    return newArr;
  };

  // 获取菜单列表并处理成 antd menu 需要的格式
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //后端只获取菜单
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getMenuData = async () => {
    setLoading(true);
    try {
      const { data } = await getMenuList();
      if (!data) return;
      setMenuList(deepLoopFloat(data));
      // 存储处理过后的所有面包屑导航栏到 redux 中
      dispatch(setBreadcrumbList(findAllBreadcrumb(data)));
      // 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
      const dynamicRouter = handleRouter(data);
      dispatch(setAuthRouter(dynamicRouter));
      console.log(dynamicRouter,'dynamicRouter');
      dispatch(setMenuListAction(data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const routeData = useSelector((state: any) => state.route.routeData)
  // 后端生成路由 通过路由生成菜单
  const getMenu = async () => {
    setLoading(true);
    try {
      const backMenu = changeMenu(routeData)
      console.log('backroutes: ', backMenu);
      const all: Menu.MenuOptions[] = [BASE_MENU, ...backMenu]
      setMenuList(deepLoopFloat(all));
      // 存储处理过后的所有面包屑导航栏到 redux 中
      dispatch(setBreadcrumbList(findAllBreadcrumb(all)));
      // 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
      const dynamicRouter = handleRouter(all);
      dispatch(setAuthRouter(dynamicRouter));
      dispatch(setMenuListAction(all));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    // getMenuData();
    getMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeData]);

  // 点击当前菜单跳转页面
  const navigate = useNavigate();
  const menuListStore = useSelector((state: RootState) => state.menu.menuList)
  const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
    const route = searchRoute(key, menuListStore);
    if (route.isLink) {
      return window.open(route.isLink, "_blank")
    };
    navigate(key);
  };

  return <div className="menu">
    <Spin spinning={loading} tip="Loading...">
      <Logo></Logo>
      <Menu
        theme="dark"
        mode="inline"
        triggerSubMenuAction="click"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        items={menuList}
        onClick={clickMenu}
        onOpenChange={onOpenChange}
      ></Menu>
    </Spin>
  </div>
}

export default LayoutMenu;