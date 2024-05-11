import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Form, Formik } from "formik";
import useStockRequest from "../../services/useStockRequest";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AddSales = ({handleClickPath}) => {
  const { addStock,getStock } = useStockRequest();
  const{brands,products} = useSelector(state => state.stock)
  useEffect(()=>{
    getStock("brands")
    getStock("products")
  },[])
 
  return (
    <Box
      height={"100vh"}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Container sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Typography
          textAlign={"center"}
          color={"brown"}
          variant="h5"
          fontWeight={"bold"}
          textTransform={"uppercase"}
        >
          Add Sales
        </Typography>
        <Formik
          initialValues={{
            brand:"",
            product:"",
            quantity:"",
            price:""
          }}
          onSubmit={(values, actions) => {
            const brandId = brands.find(brand => brand.name === values.brand)?._id //find ile bul, id sini yakala
            const productId = products.find(product => product.name === values.product)?._id //find ile bul, id sini yakala

            const formData = {
              brandId,
              productId,
              quantity: values.quantity,
              price: values.price
            }
            addStock("sales", formData);
            actions.resetForm();
            actions.setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
          
            isSubmitting,
          }) => (
            <Form>
              <Box
                width={"60%"}
                m={"auto"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  py: "3rem",
                  px: "1.5rem",
                  borderRadius: "10px",
                }}
              >
               
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel sx={{color:"white"}} id="demo-simple-select-label">Brand</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="brand"
                      name="brand"
                      value={values.brand}
                      label="Brand"
                      onChange={handleChange}
                      sx={{
                        color:"white",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#37B3E2",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#37B3E2",
                        },
                      }}
                      
                    > <MenuItem onClick={() => {
                      handleClickPath("/stock/addbrand")
                    }}  key={"addbrand"} value="Add New Brand">
                    Add New Brand
                  </MenuItem>
                    <Divider/>
                      {
                        brands?.map(({_id,name}) => (
                          <MenuItem key={_id} value={name}>{name}</MenuItem>
                        ))
                      }
                   
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel sx={{color:"white"}} id="demo-simple-select-label">Product</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="product"
                      name="product"
                      value={values.product}
                      label="Product"
                      onChange={handleChange}
                      sx={{
                        color:"white",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#37B3E2",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#37B3E2",
                        },
                      }}
                      
                    > <MenuItem onClick={() => {
                      handleClickPath("/stock/addproduct")
                    }}  key={"addproduct"} value="Add New Product">
                    Add New Product
                  </MenuItem>
                    <Divider/>
                      {
                        products?.map(({_id,name}) => (
                          <MenuItem key={_id} value={name}>{name}</MenuItem>
                        ))
                      }
                   
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  label="Quantity *"
                  name="quantity"
                  id="outlined-number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      color: "white",
                    },
                  }}
                  variant="outlined"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
         
                  InputProps={{
                    sx: {
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#37B3E2",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#37B3E2",
                      },
                    },
                  }}
                  
                />
                <TextField
                  label="Price *"
                  name="price"
                  id="outlined-number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                    sx: {
                      color: "white",
                    },
                  }}
                  variant="outlined"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                 
                  InputProps={{
                    sx: {
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#37B3E2",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#37B3E2",
                      },
                    },
                  }}
                  
                />

                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  color="primary"
                  sx={{ width: "30%", m: "auto" }}
                >
                  Add Sales
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default AddSales;
