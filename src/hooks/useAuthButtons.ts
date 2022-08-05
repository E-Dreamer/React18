


/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 17:20:02
 * @LastEditTime: 2022-08-04 17:22:28
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { useLocation } from "react-router-dom"
import { searchRoute } from '@/utils';
import { rootRouter } from '@/router';
import store from '@/store'
const useAuthButtons = () => {
  const { pathname } = useLocation()
  const route = searchRoute(pathname, rootRouter)
  return {
    BUTTONS: store.getState().global.authButtons[route.meta!.key!] || {}
  };
}
export default useAuthButtons;