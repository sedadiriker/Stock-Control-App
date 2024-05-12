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
import {  object, string } from "yup";
import useStockRequest from "../../services/useStockRequest";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AddProduct = ({handleClickPath}) => {
  const addProductSchema = object({
    name: string().required("Name is required"),
  });


  const { addStock,getStock } = useStockRequest();
  const{categories,brands} = useSelector(state => state.stock)
  // console.log(categories)

  useEffect(()=>{
    getStock("categories")
    getStock("brands")
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
          Add Product
        </Typography>
        <Formik
          initialValues={{
            name: "",
            brand:"",
            category:"",
          }}
          validationSchema={addProductSchema}
          onSubmit={(values, actions) => {
            const categoryId = categories.find(category => category.name === values.category)?._id //find ile bul, id sini yakala
            const brandId = brands.find(brand => brand.name === values.brand)?._id //find ile bul, id sini yakala

            const formData = {
              name: values.name,
              categoryId,
              brandId
            }
            addStock("products", formData);
            console.log("pro",formData)
            actions.resetForm();
            actions.setSubmitting(false);
            handleClickPath("/stock/listproducts")
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
                  backgroundColor: "#0551B670",
                  py: "3rem",
                  px: "1.5rem",
                  borderRadius: "10px",
                }}
              >
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel sx={{color:"white"}} id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="category"
                      name= "category" //! bu name önemli, belirtilmezse algılamıyor!!
                      value={values.category}
                      label="Category"
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
                          borderColor: "brown",
                        },
                      }}
                      
                    >
                      {
                        categories?.map(({_id,name}) => (
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
                          borderColor: "brown",
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
                <TextField
                  label="Product Name *"
                  name="name"
                  id="name"
                  type="text"
                  variant="outlined"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
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
                        borderColor: "brown",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "white",
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
                  Add Product
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default AddProduct;
