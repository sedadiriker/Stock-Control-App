import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {  Formik } from "formik";
import { } from "react-router-dom";
import useApiRequest from "../services/useApiRequest";
import RegisterForm, { registerSchema } from "../components/RegisterForm";

const Register = () => {
  const { register } = useApiRequest();

  return (
    <Box
      minHeight={"100vh"}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py:3
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
            fontSize: { xs: "2rem", md: "3rem" },
            WebkitTextStroke: "1px #1876D1",
          }}
        >
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
            console.log("Form submitted with values:", values);
            register(values);
            actions.resetForm();
            actions.setSubmitting(false);
          }}
          component={(props) => <RegisterForm {...props}/>}
        ></Formik>
      </Container>
    </Box>
  );
};

export default Register;
