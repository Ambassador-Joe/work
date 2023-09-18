import React from "react";
import { Box, Button, TextField, Typography, Select, MenuItem } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Header from "components/common/Header";
import axios from "axios";

const PerformanceAppraisal = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Send data to the server using Axios
      await axios.post("/api/performance-appraisal", values);

      // If the API call is successful, reset the form and set submitting to false
      resetForm();
      setSubmitting(false);
      console.log("Appraisal data submitted successfully!");
    } catch (error) {
      // If there's an error with the API call, set submitting to false
      setSubmitting(false);
      console.error("Error submitting appraisal data:", error);
    }
  };

  const appraisalSchema = yup.object().shape({
    staffName: yup.string().required("Staff name is required"),
    appraisalDate: yup.date().required("Appraisal date is required"),
    performanceRating: yup.string().required("Performance rating is required"),
    comments: yup.string(),
  });

  const initialValues = {
    staffName: "",
    appraisalDate: null,
    performanceRating: "",
    comments: "",
  };

  return (
    <Box m="20px">
      <Header title="Performance Appraisal" subtitle="Appraise Staff Performance" />

      <Formik
        initialValues={initialValues}
        validationSchema={appraisalSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: "span 4" },
              }}
            >
              <Field name="staffName">
                {({ field, meta }) => (
                  <div>
                    <TextField
                      {...field}
                      fullWidth
                      variant="filled"
                      label="Staff Name"
                    />
                    <ErrorMessage name="staffName" component="div" style={{ color: "red" }} />
                  </div>
                )}
              </Field>
              <Field name="appraisalDate">
                {({ field, meta }) => (
                  <div>
                    <TextField
                      {...field}
                      fullWidth
                      variant="filled"
                      label="Appraisal Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <ErrorMessage name="appraisalDate" component="div" style={{ color: "red" }} />
                  </div>
                )}
              </Field>
              <Field name="performanceRating">
                {({ field, meta }) => (
                  <div>
                    <Typography>Performance Rating</Typography>
                    <Select
                      {...field}
                      fullWidth
                      variant="filled"
                      label="Performance Rating"
                      error={meta.touched && !!meta.error}
                    >
                      <MenuItem value="Execellent">Excellent</MenuItem>
                      <MenuItem value="Very Good">Very Good</MenuItem>
                      <MenuItem value="Good">Good</MenuItem>
                      <MenuItem value="Average">Average</MenuItem>
                      <MenuItem value="Poor">Poor</MenuItem>
                      <MenuItem value="Very Poor">Very Poor</MenuItem>

                    </Select>
                    {meta.touched && meta.error && (
                      <ErrorMessage name="performanceRating" component="div" style={{ color: "red" }} />
                    )}
                  </div>
                )}
              </Field>
              <Field name="comments">
                {({ field, meta }) => (
                  <div>
                    <TextField
                      {...field}
                      fullWidth
                      variant="filled"
                      label="Comments"
                      multiline
                      rows={4}
                    />
                    <ErrorMessage name="comments" component="div" style={{ color: "red" }} />
                  </div>
                )}
              </Field>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                Submit Appraisal
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PerformanceAppraisal;
