/*
 * @Author: E-Dreamer
 * @Date: 2022-08-03 15:32:19
 * @LastEditTime: 2022-08-03 15:33:42
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { Spin } from "antd";
import "./index.scss";

const Loading = ({ tip = "Loading" }: { tip?: string }) => {
  return <Spin tip={tip} size="large" className="request_loading" />;
};

export default Loading;
