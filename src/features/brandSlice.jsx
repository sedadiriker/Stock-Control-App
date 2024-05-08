import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    brands: [],
    loading: false,
    error: false,
}

const brandSlice = createSlice({
  name: "getbrands",
  initialState,
  reducers: {
    fetchStart: (state) => {
        state.loading = true
    },
    brandsList: (state, {payload}) => {
        state.loading = false
        state.brands = payload.data
    },
    fetchFail: (state) => {
        state.loading = false
        state.error = true
    },
  }
});

export const {fetchStart, brandsList,fetchFail} = brandSlice.actions

export default brandSlice.reducer