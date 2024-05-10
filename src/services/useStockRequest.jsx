import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";
import { addStockSuccess, deleteStockSuccess, editStockSuccess, fetchFail, fetchStart, getStockSuccess } from "../features/stockSlice";

const useStockRequest = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();


  const getStock = async (path="firms" ) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`/${path}`);
      const stockData = data.data;
      dispatch(getStockSuccess({  stockData, path })); // datayı ve path ı yolladık..
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify(`Failed to loading ${path}`);
    }
  };

  const deleteStock = async (path="firms" , id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${path}/${id}`); // path parametrik yapıldı.
      dispatch(deleteStockSuccess({path,id}))
      getStock(path); // sildikten sonra yenileme
      toastSuccessNotify("deleted successfully.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Failed to delete.");
      console.log(error);
    }
  };

   const editStock = async (path="firms",id,formData) => {
    dispatch(fetchStart())
    try{
      const {data} = await axiosToken.put(`/${path}/${id}`,formData)
      const updateData = data.new
      dispatch(editStockSuccess({path,updateData}))
      getStock(path)
      toastSuccessNotify("Update successfully.");
    }catch(err){
      dispatch(fetchFail())
      toastErrorNotify("Failed to update.");
      console.log(err)
    }
  }

  const addStock = async (path="firms",formData) => {
    dispatch(fetchStart())
    try{
      const {data} = await axiosToken.post(`/${path}/`,formData)
      const addData = data.data
      dispatch(addStockSuccess({path,addData}))
      getStock(path)
      toastSuccessNotify("Added successfully.");
    }catch(err){
      dispatch(fetchFail())
      toastErrorNotify("Failed to add.");
      console.log(err)
    }
  }

  

  return { getStock,deleteStock,editStock,addStock };
};

export default useStockRequest;
