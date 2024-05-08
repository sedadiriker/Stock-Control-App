import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import { fetchFail, fetchStart, firmsList } from "../features/firmSlice"

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

  return { getFirms }
}

export default useStockRequest
