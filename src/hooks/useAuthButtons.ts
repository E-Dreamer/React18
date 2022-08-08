import { useSelector } from 'react-redux';



/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 17:20:02
 * @LastEditTime: 2022-08-08 16:17:15
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { useLocation } from "react-router-dom"
import { searchRoute } from '@/utils';
// import { rootRouter } from '@/router';
import store from '@/store'
const useAuthButtons = () => {
  const { pathname } = useLocation()
  const allRouter = useSelector((state: any) => state.global.allRouter)
  const route = searchRoute(pathname, allRouter)
  return {
    BUTTONS: store.getState().global.authButtons[route.meta!.key!] || {}
  };
}
export default useAuthButtons;