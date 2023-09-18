import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";

const notificationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  message: yup.string().required("Message is required"),
});

const NotificationPage = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Send data to the server using Axios
      await axios.post("/api/sendNotification", values);

      // If the API call is successful, reset the form and set submitting to false
      resetForm();
      setSubmitting(false);
      console.log("Notification sent successfully!");
    } catch (error) {
      // If there's an error with the API call, set submitting to false
      setSubmitting(false);
      console.error("Error sending notification:", error);
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Send Notification
      </Typography>

      <Formik
        initialValues={{ title: "", message: "" }}
        validationSchema={notificationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt="20px">
              <Field name="title">
                {({ field, meta }) => (
                  <div>
                    <TextField
                      fullWidth
                      name={field.name}
                      label="Title"
                      variant="outlined"
                      value={field.value}
                      onChange={field.onChange}
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  </div>
                )}
              </Field>
            </Box>
            <Box mt="20px">
              <Field name="message">
                {({ field, meta }) => (
                  <div>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      name={field.name}
                      label="Message"
                      variant="outlined"
                      value={field.value}
                      onChange={field.onChange}
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  </div>
                )}
              </Field>
            </Box>
            <Box mt="20px">
              <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                Send Notification
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default NotificationPage;
