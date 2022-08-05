import { createSlice } from '@reduxjs/toolkit';
/*
 * @Author: E-Dreamer
 * @Date: 2022-08-04 13:54:24
 * @LastEditTime: 2022-08-05 14:55:47
 * @LastEditors: E-Dreamer
 * @Description: 
 */
interface State {
  breadcrumbList: {
    [propName: string]: any;
  };
}
const initialState: State = {
  breadcrumbList: {}
}

const breadcrumb = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    setBreadcrumbList: (state, action) => {
      state.breadcrumbList = action.payload
    }
  }
})

export const { setBreadcrumbList } = breadcrumb.actions

export default breadcrumb.reducer