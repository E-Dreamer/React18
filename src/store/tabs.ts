
/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 10:10:12
 * @LastEditTime: 2022-08-05 10:41:31
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { createSlice } from "@reduxjs/toolkit"
import { HOME_URL } from '@/config/index';
interface State {
  tabsAction: string,
  tabsList: Menu.MenuOptions[]
}
const initialState: State = {
  tabsAction: HOME_URL,
  tabsList: [{ title: "首页", path: HOME_URL }]
}

const tabs = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setTabsList: (state, action) => {
      state.tabsList = action.payload
    },
    setTabsActive: (state, action) => {
      state.tabsAction = action.payload
    }
  }
})
export const { setTabsList, setTabsActive } = tabs.actions

export default tabs.reducer
