/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 16:07:01
 * @LastEditTime: 2022-08-04 16:15:19
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import screenfull from 'screenfull'
import { message } from "antd";
import { useEffect, useState } from "react";

const Fullscreen = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen);

  useEffect(() => {
    screenfull.on("change", () => {
      if (screenfull.isFullscreen) setFullScreen(true);
      else setFullScreen(false);
      return () => screenfull.off("change", () => { });
    });
  }, []);

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) message.warning("当前您的浏览器不支持全屏 ❌");
    screenfull.toggle();
  };
  return (
    <i className={["icon-style iconfont", fullScreen ? "icon-suoxiao" : "icon-fangda"].join(" ")} onClick={handleFullScreen}></i>
  );
};
export default Fullscreen;
