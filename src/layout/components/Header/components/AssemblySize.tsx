
/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 16:07:15
 * @LastEditTime: 2022-08-05 15:20:18
 * @LastEditors: E-Dreamer
 * @Description: 
 */
/* eslint-disable eqeqeq */
import { setAssemblySize } from "@/store/global";
import { Dropdown, Menu } from "antd";

import {  useDispatch, useSelector } from "react-redux";
const AssemblySize = (props: any) => {
  const { assemblySize } = useSelector((state:any)=> state.global);
  const dispatch = useDispatch()
  // 切换组件大小
  const onClick = (e: MenuInfo) => {
    dispatch(setAssemblySize(e.key));
  };

  const menu = (
    <Menu
      items={[
        {
          key: "middle",
          disabled: assemblySize == "middle",
          label: <span>默认</span>,
          onClick
        },
        {
          disabled: assemblySize == "large",
          key: "large",
          label: <span>大型</span>,
          onClick
        },
        {
          disabled: assemblySize == "small",
          key: "small",
          label: <span>小型</span>,
          onClick
        }
      ]}
    />
  );
  return (
    <Dropdown overlay={menu} placement="bottom" trigger={["click"]} arrow={true}>
      <i className="icon-style iconfont icon-contentright"></i>
    </Dropdown>
  );
};

export default AssemblySize
