import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import useStockRequest from "../../services/useStockRequest";

const AddBrand = ({handleClickPath}) => {
  const{addStock} = useStockRequest()

  const addBrandSchema = object({
    name: string()
      .required("Name is required"),
    image: string().required("imageUrl is required"),
  });
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
      <Container sx={{ display:"flex", flexDirection:"column", gap:"2rem"}}>
      <Typography textAlign={"center"} color={"brown"} variant="h5" fontWeight={"bold"} textTransform={"uppercase"}>Add Brand</Typography>
        <Formik
            initialValues={{
              name: "",
              image: "",
            }}
            validationSchema={addBrandSchema}
            onSubmit={(values, actions) => {
              addStock("brands",values)
              actions.resetForm();
              actions.setSubmitting(false);
              handleClickPath("/stock/listbrands")
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
                <Box width={"60%"} m={"auto"} sx={{ display: "flex", flexDirection: "column", gap: 2, backgroundColor:"#0551B670", py:"3rem", px:"1.5rem", borderRadius:"10px" }}>
                <TextField
                    label="Brand Name *"
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
               
                  <TextField
                    label="Brand İmageUrl *"
                    name="image"
                    id="image"
                    type="text"
                    variant="outlined"
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.image && Boolean(errors.image)}
                    helperText={touched.image && errors.image}
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
                    sx={{width:"30%", m:"auto"}}
                    
                  >
                    Add Brand
                  </Button>
                  
                </Box>
              </Form>
            )}
          </Formik>
          
      </Container>
    </Box>
  );
}

export default AddBrand

