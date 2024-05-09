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
    editBrandsSuccess:(state,{payload}) => {
      state.loading = false
      
      const updatedBrand = payload
      state.brands = state.brands.map(brand => {
          if(brand._id === updatedBrand?._id) {
              return updatedBrand
          }
          return brand
      })
    },
    fetchFail: (state) => {
        state.loading = false
        state.error = true
    },
  }
});

export const {fetchStart, brandsList,fetchFail,editBrandsSuccess} = brandSlice.actions

export default brandSlice.reducer