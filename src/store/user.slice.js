import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData: {}
}
export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
    getAdmin(state, action) {
      state.adminData = action.payload
    }
  }
})


export const adminActions = adminSlice.actions

export const admin = state => state.admin.adminData