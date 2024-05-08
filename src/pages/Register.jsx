import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { object, string } from "yup";
const Register = () => {
  const registerSchema = object({
    email: string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be at most 10 characters")
      .matches(/\d+/, "The password must contain at least one number")
      .matches(
        /[a-z]+/,
        "The password must contain at least one lowercase letter"
      )
      .matches(
        /[A-Z]+/,
        "The password must contain at least one uppercase letter"
      )
      .matches(
        /[@$!%*?&]+/,
        "The password must contain at least one special character(@$!%*?&)"
      ),
    username: string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(12, "Username must be at most 10 characters"),
    first_name: string().required("firstname is required"),
    last_name: string().required("lastname is required"),
  });
  return (
    <Box
      height={"100vh"}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('images/login/background.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "blur(3px)",
          zIndex: -1
        }}
      />
      <Container sx={{ display:"flex", flexDirection:"column", gap:"5rem"}}>
        <Typography textAlign={"center"} color={"white"} fontWeight={"bold"} variant="h2" sx={{textShadow:"2px 3px 5px blue"}}>
          Stock Control System
        </Typography>

        <Formik
            initialValues={{
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
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
                <Box width={"60%"} m={"auto"} sx={{ display: "flex", flexDirection: "column", gap: 2, backgroundColor:"rgba(0, 0, 0, 0.7)", py:"3rem", px:"1.5rem", borderRadius:"10px" }}>
                <TextField
                    label="User Name *"
                    name="username"
                    id="userName"
                    type="text"
                    variant="outlined"
                    value={values.displayName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
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
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                  <TextField
                    label="First Name *"
                    name="first_name"
                    id="firstName"
                    type="text"
                    variant="outlined"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.first_name && Boolean(errors.first_name)}
                    helperText={touched.first_name && errors.first_name}
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
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                  <TextField
                    label="Last Name *"
                    name="last_name"
                    id="last_name"
                    type="text"
                    variant="outlined"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.last_name && Boolean(errors.last_name)}
                    helperText={touched.last_name && errors.last_name}
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
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                  <TextField
                    label="Email *"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
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
                    InputLabelProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                  <TextField
                    label="Password *"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
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
                    Register
                  </Button>
                  <Box sx={{ textAlign: "center", mt:2 }}>
            <Link to="/" style={{color:"#a0d6e8"}}>Do you have an account?</Link>
          </Box>
                </Box>
              </Form>
            )}
          </Formik>
          
      </Container>
    </Box>
  );
}

export default Register
