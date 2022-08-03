/*
 * @Author: E-Dreamer
 * @Date: 2022-08-03 10:30:14
 * @LastEditTime: 2022-08-03 15:42:21
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import { configureStore } from "@reduxjs/toolkit";

import tokenReducer from "./tokenSlice";
const store =  configureStore({
  reducer: {
    counter: tokenReducer
  }
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

