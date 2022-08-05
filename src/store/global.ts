import { createSlice } from '@reduxjs/toolkit'
import { SizeType } from 'antd/lib/config-provider/SizeContext';
/* themeConfigProp */
export interface ThemeConfigProp {
  primary: string;
  isDark: boolean;
  weakOrGray: string;
}
// Define a type for the slice state
interface State {
  token: string;
  authRouter: string[];
  authButtons: {
    [propName: string]: any;
  };
  userInfo: any;
  assemblySize: SizeType;
  language: string;
  themeConfig: ThemeConfigProp;
}

// Define the initial state using that type
const initialState: State = {
  token: '',
  authRouter: [],
  authButtons: {},
  userInfo: "",
  assemblySize: "middle",
  language: "",
  themeConfig: {
    // 默认 primary 主题颜色
    primary: "#1890ff",
    // 深色模式
    isDark: false,
    // 色弱模式(weak) || 灰色模式(gray)
    weakOrGray: ""
  }
}

export const tokenSlice = createSlice({
  name: 'global',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setAuthRouter(state, action) {
      state.authRouter = action.payload
    },
    setAuthButtons(state, action) {
      state.authButtons = action.payload
    },
    setAssemblySize(state, action) {
      state.assemblySize = action.payload
    },
    setLanguage(state, action) {
      state.language = action.payload
    },
    setDark(state, action) {
      state.themeConfig.isDark = action.payload
    },
    setWeakOrGray(state, action) {
      state.themeConfig.weakOrGray = action.payload
    },
  }
})

export const { setToken, setAuthRouter, setAuthButtons,
  setWeakOrGray, setDark, setLanguage, setAssemblySize } = tokenSlice.actions


export default tokenSlice.reducer