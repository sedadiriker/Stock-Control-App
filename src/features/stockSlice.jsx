import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firms: [],
    brands: [],
    products: [],
    categories: [],
    loading:false,
    error:false

}

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    fetchStart: (state) => {
        state.loading = true
    },
    getStockSuccess : (state, {payload:{path,stockData}}) => {
        state.loading = false
        state[path] = stockData
    },
    deleteStockSuccess : (state, {payload:{path,id}}) => {
      state.loading = false
      state[path] = state[path].filter((item) => item._id !== id)
    },
    editStockSuccess : (state,{payload:{path,updateData}})=> {
      state.loading = false
      state[path] = state[path].map(item => {
        if(item.id === updateData._id) {
          return updateData
        }
        return item
      })
    },
    addStockSuccess : (state,{payload:{path,addData}}) => {
      state.loading = false
      state[path].push(addData)
    },
    fetchFail: (state) => {
        state.loading = false
        state.error = true
    },
  }
});

export const {fetchFail,getStockSuccess,fetchStart,deleteStockSuccess,editStockSuccess,addStockSuccess} = stockSlice.actions

export default stockSlice.reducer