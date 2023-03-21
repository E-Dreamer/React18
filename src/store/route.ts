import { RouteObject } from "@/config/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBackRoutes } from "@/api/modules/menu";
import {changeRoute} from '@/utils'
import { filterAllRoutes } from "@/router";
interface State {
  routeData: BackStageRoute[];
  allRouter: RouteObject[];
}

const initialState: State = {
  routeData: [],
  allRouter: []
}

export const fetchAllRouters:any = createAsyncThunk('route/fetchAllRouters', async () => {
  const {data} = await getBackRoutes();
  return data
})
const routeSlice = createSlice({
  name: 'storeRoute',
  initialState,
  reducers: {
    setRouteData(state, action) {
      state.routeData = action.payload;
    },
    setAllRouter(state, action) {
      state.allRouter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllRouters.fulfilled, (state, payload) => {
      console.log('成功了 获取后台路由', payload);
      state.routeData =  changeRoute(filterAllRoutes(state.routeData.concat(payload)));
    })
    builder.addCase(fetchAllRouters.rejected, (state, payload) => {
      console.log('请求失败了');
    })
  }
})

export const { setRouteData, setAllRouter } = routeSlice.actions
export default routeSlice.reducer