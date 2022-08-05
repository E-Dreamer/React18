import { createSlice } from '@reduxjs/toolkit';
/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 14:05:00
 * @LastEditTime: 2022-08-04 14:07:55
 * @LastEditors: E-Dreamer
 * @Description: 
 */
interface State {
  isCollapse: boolean;
  menuList: Menu.MenuOptions[];
}

const initialState: State = {
  isCollapse: true,
  menuList: []
}

const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    updateCollapse(state, action) {
      state.isCollapse = action.payload
    },
    setMenuList(state, action) {
      state.menuList = action.payload
    }
  }
})

export const { updateCollapse, setMenuList } = menu.actions

export default menu.reducer