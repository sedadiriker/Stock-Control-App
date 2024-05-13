import { Box, Button, TextField } from "@mui/material";
import { Form } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { object, string } from "yup";

export const registerSchema = object({
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
  firstName: string().required("firstname is required"),
  lastName: string().required("lastname is required"),
});

const RegisterForm = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
}) => {
  return (
    <Form>
      <Box
        m={"auto"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          py: "3rem",
          px: "1.5rem",
          borderRadius: "10px",
          width:{xs:"90%",md:"60%"}
        }}
      >
        <TextField
          label="User Name *"
          name="username"
          id="userName"
          type="text"
          variant="outlined"
          value={values.userName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.userName && Boolean(errors.userName)}
          helperText={touched.userName && errors.userName}
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
          name="firstName"
          id="firstName"
          type="text"
          variant="outlined"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
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
          name="lastName"
          id="lastName"
          type="text"
          variant="outlined"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
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
          color="primary"
          sx={{ width: "30%", m: "auto" }}
        >
          Register
        </Button>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Link to="/" style={{ color: "#a0d6e8" }}>
            Do you have an account?
          </Link>
        </Box>
      </Box>
    </Form>
  );
};
export default RegisterForm;
