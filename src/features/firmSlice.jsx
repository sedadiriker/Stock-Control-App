import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firms: [],
    loading: false,
    error: false,
}

const firmSlice = createSlice({
    name: "getfirms",
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true
        },
        firmsList: (state, {payload}) => {
            state.loading = false
            state.firms = payload.data
        },
        fetchFail: (state) => {
            state.loading = false
            state.error = true
        },
    }
});

export const { fetchFail, firmsList, fetchStart } = firmSlice.actions

export default firmSlice.reducer
