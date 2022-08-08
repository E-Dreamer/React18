import { createSlice } from '@reduxjs/toolkit';

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