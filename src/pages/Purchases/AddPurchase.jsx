import {
  Button,
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

const AddPurchase = () => {


  const { addStock,getStock } = useStockRequest();
  const{firms,brands,products} = useSelector(state => state.stock)

  useEffect(()=>{
    getStock("firms")
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
          Add Purchase
        </Typography>
        <Formik
          initialValues={{
            firm: "",
            brand:"",
            product:"",
            quantity:"",
            price:""
          }}
          onSubmit={(values, actions) => {
            const firmId = firms.find(firm => firm.name === values.firm)?._id //find ile bul, id sini yakala
            const brandId = brands.find(brand => brand.name === values.brand)?._id //find ile bul, id sini yakala
            const productId = products.find(product => product.name === values.product)?._id //find ile bul, id sini yakala

            const formData = {
              firmId,
              brandId,
              productId,
              quantity: values.quantity,
              price: values.price
            }
            addStock("purchases", formData);
            actions.resetForm();
            actions.setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
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
                    <InputLabel sx={{color:"white"}} id="demo-simple-select-label">Firm</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="firm"
                      name= "firm" //! bu name önemli, belirtilmezse algılamıyor!!
                      value={values.firm}
                      label="Firm"
                      onChange={(e) => handleChange(e)}
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
                      
                    >
                      {
                        firms?.map(({_id,name}) => (
                          <MenuItem key={_id}  value={name}>{name}</MenuItem>
                        ))
                      }
                   
                    </Select>
                  </FormControl>
                </Box>
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
                      
                    >
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
                      
                    >
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
                  // error={touched.name && Boolean(errors.name)}
                  // helperText={touched.name && errors.name}
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
                  Add Purchase
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default AddPurchase;
