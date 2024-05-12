import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import useApiRequest from "../services/useApiRequest";

const Login = () => {
  const { login } = useApiRequest();
  const loginSchema = object({
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
      ),
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
          zIndex: -1,
        }}
      />
      <Container sx={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
        <Typography
          textAlign={"center"}
          color={"white"}
          fontWeight={"bold"}
          sx={{
            fontSize: { xs: "1rem", md: "3rem" },
            WebkitTextStroke: "1px #1876D1",
          }}
        >
          Stock Control System
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            login(values);
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
                <TextField
                  placeholder="test@test.com"
                  label="Email"
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
                placeholder="123456Cl*"
                  label="Password"
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
                {/* <Box style={{ textAlign: "right" }}>
                    <Link style={{ color: "#11B4BB", display: "inline" }}>
                      Forgot password
                    </Link>
                  </Box> */}
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  color="primary"
                  sx={{ width: "30%", m: "auto" }}
                >
                  Login
                </Button>
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Link to="/register" style={{ color: "#a0d6e8" }}>
                    Do you have not an account?
                  </Link>
                </Box>
                
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Login;
