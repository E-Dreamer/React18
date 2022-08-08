/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 15:51:34
 * @LastEditTime: 2022-08-08 16:18:11
 * @LastEditors: E-Dreamer
 * @Description: 
 */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { message, Tabs } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setTabsList } from '@/store/tabs'
import { HOME_URL } from '@/config'
import { useLocation, useNavigate } from "react-router-dom";
import { searchRoute } from "@/utils";
// import { rootRouter } from "@/router";
import MoreButton from "./MoreButton";
import './index.scss'

const LayoutTabs = (props: any) => {
  // const { tabsList } = props;
  const tabsList = useSelector((state: any) => state.tabs.tabsList)
  const allRouter = useSelector((state: any) => state.global.allRouter)
  const dispatch = useDispatch()
  const { TabPane } = Tabs;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeValue, setActiveValue] = useState<string>(pathname);
  const clickTabs = (path: string) => {
    navigate(path);
  };
  useEffect(() => {
    addTabs();
  }, [pathname]);

  // add tabs
  const addTabs = () => {
    const route = searchRoute(pathname, allRouter);
    let newTabsList = JSON.parse(JSON.stringify(tabsList));
    if (tabsList.every((item: any) => item.path !== route.path)) {
      newTabsList.push({ title: route.meta!.title, path: route.path });
    }
    dispatch(setTabsList(newTabsList))
    setActiveValue(pathname);
  };

  const delTabs = (tabPath?: string) => {
    if (tabPath === HOME_URL) return;
    if (pathname === tabPath) {
      tabsList.forEach((item: Menu.MenuOptions, index: number) => {
        if (item.path !== pathname) return;
        const nextTab = tabsList[index + 1] || tabsList[index - 1]
        if (!nextTab) return;
        navigate(nextTab.path);
      })
    }
    message.success("你删除了Tabs标签 😆😆😆");
    dispatch(setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath)))
  }
  return <div className="tabs">
    <Tabs
      activeKey={activeValue}
      onChange={clickTabs}
      hideAdd
      type="editable-card"
      onEdit={path => {
        delTabs(path as string);
      }}
    >
      {tabsList.map((item: Menu.MenuOptions) => {
        return (
          <TabPane
            key={item.path}
            tab={
              <span>
                {item.path == HOME_URL ? <HomeFilled /> : ""}
                {item.title}
              </span>
            }
            closable={item.path !== HOME_URL}
          ></TabPane>
        );
      })}
    </Tabs>
    <MoreButton delTabs={delTabs} {...{ setTabsList, tabsList }} ></MoreButton>
  </div>
}
export default LayoutTabs