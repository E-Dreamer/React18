/// <reference types="react-scripts" />

declare module '*.scss';
declare module 'nprogress'
declare module 'mockjs'
declare module 'screenfull'
declare module 'react-transition-group'
// * Dropdown MenuInfo
declare interface MenuInfo {
	key: string;
	keyPath: string[];
	/** @deprecated This will not support in future. You should avoid to use this */
	item: React.ReactInstance;
	domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
// * Menu
declare namespace Menu {
	interface MenuOptions {
		path: string;
		title: string;
		icon?: string;
		isLink?: string;
		close?: boolean;
		children?: MenuOptions[];
	}
}
// 后台返回的路由数据
declare namespace BackStageRoute {
  interface RouteOptions {
    path: string;
		title: string;
		icon?: string;
		isLink?: string;
    show?:boolean;
    children?: RouteOptions[];
    parent?:string,
  }
}