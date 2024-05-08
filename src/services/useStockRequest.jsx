import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { deleteFirmSuccess, editSuccess, fetchFail, fetchStart, firmsList } from "../features/firmSlice"

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
      console.log(error)
    }
  }

  const deleteFirm = async (id) => {
    dispatch(fetchStart())
    try{
      const {data} = await axiosToken.delete(`/firms/${id}`)
      dispatch(deleteFirmSuccess(data))
      getFirms()
    }catch(err){
      dispatch(fetchFail())
      console.log(err)
    }
  }

  const editFirm = async (id,formData) => {
    dispatch(fetchStart())
    try{
      const {data} = await axiosToken.put(`/firms/${id}`,formData)
      dispatch(editSuccess(data.data))
      getFirms()
    }catch(err){
      dispatch(fetchFail())
      console.log(err)
    }
  }

  return { getFirms,deleteFirm,editFirm }
}

export default useStockRequest
