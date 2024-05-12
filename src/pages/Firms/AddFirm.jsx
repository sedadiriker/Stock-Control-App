import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Form, Formik } from "formik";
import { number, object, string } from "yup";
import useStockRequest from "../../services/useStockRequest";

const AddFirm = ({handleClickPath}) => {
  const{addStock} = useStockRequest()

  const addFirmSchema = object({
    name: string()
      .required("Name is required"),
    phone: number()
      .required("Phone is required"),
    address: string()
      .required("Address is required"), 
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
      <Typography textAlign={"center"} color={"brown"} variant="h5" fontWeight={"bold"} textTransform={"uppercase"}>Add Firm</Typography>
        <Formik
            initialValues={{
              name: "",
              phone: "",
              image: "",
              address: "",
            }}
            validationSchema={addFirmSchema}
            onSubmit={(values, actions) => {
              addStock("firms",values)
              actions.resetForm();
              actions.setSubmitting(false);
              handleClickPath("/stock/listfirms")

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
                    label="Firm Name *"
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
                    label="Firm Phone *"
                    name="phone"
                    id="phone"
                    type="text"
                    variant="outlined"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
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
                    label="Firm Address *"
                    name="address"
                    id="address"
                    type="text"
                    variant="outlined"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
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
                    label="Firm İmageUrl *"
                    name="image"
                    id="imageUrl"
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
                    Add Firm
                  </Button>
                  
                </Box>
              </Form>
            )}
          </Formik>
          
      </Container>
    </Box>
  );
}

export default AddFirm
