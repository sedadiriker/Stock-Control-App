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
      const deletedFirmId = payload.id;
      state.firms = state.firms.filter((firm) => firm._id !== deletedFirmId);
        },
        editSuccess:(state,{payload}) => {
        state.loading = false
        const updatedFirm = payload
        console.log("upp",updatedFirm)
        state.firms = state.firms.map(firm => {
            if(firm.id === updatedFirm.id) {
                return updatedFirm
            }
            return firm
        })
        },
        addFirmSuccess : (state,{payload}) => {
            state.loading = false;
            state.firms.push(payload.data)
        },
        fetchFail: (state) => {
            state.loading = false
            state.error = true
        },
    }
});

export const { fetchFail, firmsList, fetchStart,deleteFirmSuccess,editSuccess,addFirmSuccess } = firmSlice.actions

export default firmSlice.reducer
