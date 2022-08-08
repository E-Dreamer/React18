/*
 * @Author: E-Dreamer
 * @Date: 2022-08-03 10:30:14
 * @LastEditTime: 2022-08-08 10:37:50
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// store持久化
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import globalReducer from "./global";
import tabsReducer from './tabs'
import breadCrumbReducer from './breadcrumb'
import menuReducer from './menu'

export const rootReducer = combineReducers({
  global: globalReducer,
  tabs: tabsReducer,
  menu: menuReducer,
  breadcrumb: breadCrumbReducer
})
const persistConfig = {
  key: 'root',
  storage,
  blacklist: []
}
const myPersistReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: myPersistReducer,
  middleware: (getDefaultMiddleware: any) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  }
})

export default store

export const persistor = persistStore(store)

// RootState作用是返回store的方法getState的类型 function
export type RootState = ReturnType<typeof store.getState>

// AppDispatch 作用是拿到Store的dispatch方法的类型 function
export type AppDispatch = typeof store.dispatch

