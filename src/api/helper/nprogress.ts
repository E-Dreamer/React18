/*
 * @Author: E-Dreamer
 * @Date: 2022-08-03 15:22:42
 * @LastEditTime: 2022-08-03 15:22:42
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
	easing: "ease", // 动画方式
	speed: 500, // 递增进度条的速度
	showSpinner: true, // 是否显示加载ico
	trickleSpeed: 200, // 自动递增间隔
	minimum: 0.3 // 初始化时的最小百分比
});

export default NProgress;
