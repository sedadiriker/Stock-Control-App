import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "../pages/Login"
import Register from "../pages/Register"
import PrivateRouter from "./PrivateRouter"
import Dashboard from "../pages/Dashboard"
import Home from "../pages/Home"
import AddBrand from "../pages/Brands/AddBrand"
import AddSales from "../pages/Sales/AddSales"
import AddFirm from "../pages/Firms/AddFirm"
import AddProduct from "../pages/Products/AddProduct"
import AddPurchase from "../pages/Purchases/AddPurchase"
import ListPurchases from "../pages/Purchases/ListPurchases"
import ListProducts from "../pages/Products/ListProducts"
import ListSales from "../pages/Sales/ListSales"
import ListFirms from "../pages/Firms/ListFirms"
import ListBrands from "../pages/Brands/ListBrands"

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
            <Route path="addpurchase" element={<AddPurchase />} />
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
