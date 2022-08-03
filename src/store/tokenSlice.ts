import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface State {
  token: string
}

// Define the initial state using that type
const initialState: State = {
  token: ''
}

export const tokenSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    }
  }
})

export const { setToken } = tokenSlice.actions


export default tokenSlice.reducer