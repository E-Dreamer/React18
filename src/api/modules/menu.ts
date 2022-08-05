/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 15:20:44
 * @LastEditTime: 2022-08-05 10:10:41
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import http from '@/api'

export function getMenuList() {
  return http.get<Menu.MenuOptions[]>('/menu')
}