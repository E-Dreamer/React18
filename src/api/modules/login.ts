/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 09:04:31
 * @LastEditTime: 2022-08-05 15:40:37
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import http from '@/api'
import { Login } from '@/config/interface';

export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(`/login`, params);
}


// * 获取按钮权限
export function getAuthorButtons() {
	return http.get<Login.ResAuthButtons>(`/auth/buttons`);
};
