import { RouteObject } from '@/config/interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SizeType } from 'antd/lib/config-provider/SizeContext';
// import { getRoutes } from '@/api/modules/menu'
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
  allRouter: RouteObject[];
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
  allRouter: [],
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

// export const fetchAllRouters = createAsyncThunk('global/fetchAllRouters', async () => {
//   try {
//     let { data } = await getRoutes()
//     return data;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// })
const tokenSlice = createSlice({
  name: 'global',
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
    setAllRouter(state, action) {
      state.allRouter = action.payload;
    }
  },
  extraReducers: {
    // [fetchAllRouters.fulfilled](state, { payload }) {
    //   console.log('成功了 获取后台路由');
    //   state.allRouter = payload;
    // },
    // [fetchAllRouters.rejected](err){
    //   console.log(err);
    // }
  }
})

export const { setToken, setAuthRouter, setAuthButtons,
  setWeakOrGray, setDark, setLanguage, setAssemblySize, setAllRouter } = tokenSlice.actions


export default tokenSlice.reducer