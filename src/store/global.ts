// import { RouteObject } from '@/config/interface';
import { createSlice } from '@reduxjs/toolkit'
import { SizeType } from 'antd/lib/config-provider/SizeContext';
// import axios from 'axios';
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
  // routeData: BackStageRoute[];
  // allRouter: RouteObject[];
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
  // allRouter: [],
  // // 后端返回的路由数据
  // routeData: [],
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
// export const fetchAllRouters: any = createAsyncThunk('global/fetchAllRouters', async () => {
//   let data = await axios.get(process.env.REACT_APP_BASEURL +'/AllRoutes', { headers: { "x-access-token": initialState.token } });
//   return data
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
    // setAllRouter(state, action) {
    //   state.allRouter = action.payload;
    // },
    // setRouteData(state, action) {
    //   state.routeData = action.payload
    // }
  },
  // extraReducers: {
  //   [fetchAllRouters.fulfilled](state, { payload }) {
  //     console.log('成功了 获取后台路由',payload);
  //     state.routeData = payload;
  //   },
  //   [fetchAllRouters.rejected](err) {
  //     console.log(err);
  //   }
  // }
})

export const { setToken, setAuthRouter, setAuthButtons,
  setWeakOrGray, setDark, setLanguage, setAssemblySize,  } = tokenSlice.actions
// setRouteData, setAllRouter

export default tokenSlice.reducer