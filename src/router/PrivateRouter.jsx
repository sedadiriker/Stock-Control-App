import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter = () => {
  const {user,token} = useSelector(state => state.auth)
  // console.log(token)

  return user ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRouter