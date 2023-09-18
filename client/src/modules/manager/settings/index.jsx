import React, { useState } from "react";
import { Box, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const accountSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
});

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values, { resetForm, setSubmitting, setFieldError }) => {
    try {
      // Send data to the server using Axios
      await axios.put("/api/updateAccount", values);

      // If the API call is successful, reset the form and set submitting to false
      resetForm();
      setSubmitting(false);
      console.log("Account updated successfully!");
    } catch (error) {
      // If there's an error with the API call, set submitting to false
      setSubmitting(false);
      console.error("Error updating account:", error);
      setFieldError("password", "Failed to update account. Please try again.");
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={accountSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt="20px">
              <Field
                as={TextField}
                fullWidth
                name="username"
                label="Username"
                variant="outlined"
              />
              <ErrorMessage name="username" component="div" style={{ color: "red" }} />
            </Box>
            <Box mt="20px">
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
              />
              <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            </Box>
            <Box mt="20px">
              <Field
                as={TextField}
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage name="password" component="div" style={{ color: "red" }} />
            </Box>
            <Box mt="20px">
              <Field
                as={TextField}
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage name="confirmPassword" component="div" style={{ color: "red" }} />
            </Box>
            <Box mt="20px">
              <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                Update Account
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Settings;
