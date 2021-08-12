
import { configureStore } from '@reduxjs/toolkit'
import { adminSlice } from './user.slice'

export const store = configureStore({
  reducer: {
    admin: adminSlice.reducer
  }
})
