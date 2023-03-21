/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 09:05:44
 * @LastEditTime: 2023-03-21 12:13:48
 * @LastEditors: E-Dreamer
 * @Description: 
 */
// * 登录
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [propName: string]: any;
  }
}

export interface MetaProps {
	keepAlive?: boolean;
	requiresAuth?: boolean;
	title: string;
	key?: string;
}
export interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: true & false;
  path?: string;
	meta?: MetaProps;
	isLink?: string;
}