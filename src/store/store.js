import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../slices/auth/loginSlice"

export default configureStore({
  reducer: {

        auth:authReducer,

  }
})