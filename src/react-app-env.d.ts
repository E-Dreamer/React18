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
declare interface BackStageRoute {
  path?: string;
  title?: string;
  icon?: string;
  isLink?: string;
  show?: boolean;
  children?: BackStageRoute[];
  parent?: string,
  components?: string,
  key?: string,
  meta?: { [propsName: string]: any }
}

declare type EmitType = (event: string, ...args: any[]) => void;

declare type Recordable<T = any> = Record<string, T>;

declare type Nullable<T> = T | null;