import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { addFirmSuccess, deleteFirmSuccess, editSuccess, fetchFail, fetchStart, firmsList } from "../features/firmSlice"
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";

const useStockRequest = () => {
  const { axiosToken } = useAxios()
  const dispatch = useDispatch()


  const getFirms = async () => {
    dispatch(fetchStart())
    try {
      const { data } =await axiosToken.get("/firms")
      console.log(data)
        dispatch(firmsList(data))
    } catch (error) {
        dispatch(fetchFail())
        toastErrorNotify("Failed to loading firms.");
      console.log(error)
    }
  }

  const deleteFirm = async (id) => {
    dispatch(fetchStart())
    try{
      const {data} = await axiosToken.delete(`/firms/${id}`)
      dispatch(deleteFirmSuccess(data))
      getFirms()
      toastSuccessNotify("Firm deleted successfully.");
    }catch(err){
      dispatch(fetchFail())
      toastErrorNotify("Failed to delete firm.");
      console.log(err)
    }
  }

  const editFirm = async (id,formData) => {
    dispatch(fetchStart())
    try{
      const {data} = await axiosToken.put(`/firms/${id}`,formData)
      dispatch(editSuccess(data.data))
      toastSuccessNotify("Firm updated successfully.");
      getFirms()
    }catch(err){
      dispatch(fetchFail())
      toastErrorNotify("Failed to update firm.");
      console.log(err)
    }
  }

  const addFirm = async (formData) => {
    dispatch(fetchStart())
    try{
      const {data} = await axiosToken.post(`/firms/`,formData)
      dispatch(addFirmSuccess(data.data))
      getFirms()
      toastSuccessNotify("Firm added successfully.");
    }catch(err){
      dispatch(fetchFail())
      toastErrorNotify("Failed to add firm.");
      console.log(err)
    }
  }

  return { getFirms,deleteFirm,editFirm,addFirm }
}

export default useStockRequest
