import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "../pages/Login"
import Register from "../pages/Register"
import PrivateRouter from "./PrivateRouter"
import Dashboard from "../pages/Dashboard"
import Home from "../pages/Home"
import AddBrand from "../pages/AddBrand"
import AddSales from "../pages/AddSales"
import AddFirm from "../pages/AddFirm"
import AddProduct from "../pages/AddProduct"
import AddPurchase from "../pages/AddPurchase"
import ListPurchases from "../pages/ListPurchases"
import ListProducts from "../pages/ListProducts"
import ListSales from "../pages/ListSales"
import ListFirms from "../pages/ListFirms"
import ListBrands from "../pages/ListBrands"

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="stock" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="addsales" element={<AddSales />} />
            <Route path="addfirm" element={<AddFirm />} />
            <Route path="addbrand" element={<AddBrand />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="addpurchases" element={<AddPurchase />} />
            <Route path="listpurchases" element={<ListPurchases />} />
            <Route path="listproducts" element={<ListProducts />} />
            <Route path="listsales" element={<ListSales />} />
            <Route path="listfirms" element={<ListFirms />} />
            <Route path="listbrands" element={<ListBrands />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
