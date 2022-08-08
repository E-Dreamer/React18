import { createSlice } from '@reduxjs/toolkit';

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