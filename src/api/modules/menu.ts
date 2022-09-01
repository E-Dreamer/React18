/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 15:20:44
 * @LastEditTime: 2022-09-01 10:04:03
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import http from '@/api'

export function getMenuList() {
  return http.get<Menu.MenuOptions[]>('/menu')
}

export function getBackRoutes() {
  return http.get<BackStageRoute[]>('/AllRoutes')
}