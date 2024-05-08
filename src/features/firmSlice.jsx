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
        deleteFirmSuccess : (state , {payload}) => {
            state.loading = false
            state.firms = payload.data
        },
        editSuccess:(state,{payload}) => {
        state.loading = false
        
        const updatedFirm = payload.data
        state.firms = state.firms.map(firm => {
            if(firm.id === updatedFirm.id) {
                return updatedFirm
            }
            return firm
        })
        },
        fetchFail: (state) => {
            state.loading = false
            state.error = true
        },
    }
});

export const { fetchFail, firmsList, fetchStart,deleteFirmSuccess,editSuccess } = firmSlice.actions

export default firmSlice.reducer
