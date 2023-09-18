import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Header from "components/common/Header";
import axios from "axios";

const ApplyLeave = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Send data to the server using Axios
      await axios.post("/api/apply-leave", values);

      // If the API call is successful, reset the form and set submitting to false
      resetForm();
      setSubmitting(false);
      console.log("Leave application submitted successfully!");
    } catch (error) {
      // If there's an error with the API call, set submitting to false
      setSubmitting(false);
      console.error("Error submitting leave application:", error);
    }
  };

  const leaveSchema = yup.object().shape({
    startDate: yup.date().required("Start date is required"),
    endDate: yup.date().required("End date is required"),
    leaveType: yup.string().required("Leave type is required"),
    reason: yup.string().required("Reason for leave is required"),
  });

  const initialValues = {
    startDate: "",
    endDate: "",
    leaveType: "",
    reason: "",
  };

  return (
    <Box m="20px">
      <Header title="Apply for Leave" subtitle="Admin Page to Apply for Leave" />

      <Formik
        initialValues={initialValues}
        validationSchema={leaveSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: "span 4" },
              }}
            >
              <Field name="startDate">
                {({ field, meta }) => (
                  <div>
                    <TextField
                      {...field}
                      fullWidth
                      variant="filled"
                      label="Start Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <ErrorMessage name="startDate" component="div" style={{ color: "red" }} />
                  </div>
                )}
              </Field>
              <Field name="endDate">
                {({ field, meta }) => (
                  <div>
                    <TextField
                      {...field}
                      fullWidth
                      variant="filled"
                      label="End Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <ErrorMessage name="endDate" component="div" style={{ color: "red" }} />
                  </div>
                )}
              </Field>
              <Field name="leaveType">
                {({ field, meta }) => (
                  <div>
                    <Typography>Leave Type</Typography>
                    <TextField
                      {...field}
                      fullWidth
                      variant="filled"
                      label="Type of Leave"
                      multiline
                      rows={4}
                    />
                    <ErrorMessage name="leaveType" component="div" style={{ color: "red" }} />
                  </div>
                )}
              </Field>
              <Field name="reason">
                {({ field, meta }) => (
                  <div>
                    <TextField
                      {...field}
                      fullWidth
                      variant="filled"
                      label="Reason for Leave"
                      multiline
                      rows={4}
                    />
                    <ErrorMessage name="reason" component="div" style={{ color: "red" }} />
                  </div>
                )}
              </Field>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting}>
                Submit Leave Application
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ApplyLeave;
