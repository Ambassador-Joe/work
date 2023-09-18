import React, { useState } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import Header from "components/common/Header";
import axios from "axios";
import { useFormik} from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  staffName: yup.string().required("Staff Name is required"),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup.date().required("End Date is required"),
  leaveType: yup.string().required("Leave Type is required"),
});

const RunLeave = () => {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      staffName: "",
      startDate: "",
      endDate: "",
      leaveType: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        // Send data to the server using Axios
        await axios.post("/api/run-leave", values);

        // If the API call is successful, reset the form and set submitting to false
        formik.resetForm();
        setIsSubmitting(false);
        console.log("Leave data submitted successfully!");
      } catch (error) {
        // If there's an error with the API call, set submitting to false
        setIsSubmitting(false);
        console.error("Error submitting leave data:", error);
      }
    },
  });

  return (
    <Box m="20px">
      <Header title="Run Leave" subtitle="Admin Page to Run Leave" />

      <Box mt="20px">
        <form onSubmit={formik.handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Staff Name"
              name="staffName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.staffName}
              error={formik.touched.staffName && !!formik.errors.staffName}
              helperText={formik.touched.staffName && formik.errors.staffName}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Start Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              name="startDate"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.startDate}
              error={formik.touched.startDate && !!formik.errors.startDate}
              helperText={formik.touched.startDate && formik.errors.startDate}
            />
            <TextField
              fullWidth
              variant="filled"
              label="End Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              name="endDate"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.endDate}
              error={formik.touched.endDate && !!formik.errors.endDate}
              helperText={formik.touched.endDate && formik.errors.endDate}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Leave Type"
              name="leaveType"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.leaveType}
              error={formik.touched.leaveType && !!formik.errors.leaveType}
              helperText={formik.touched.leaveType && formik.errors.leaveType}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default RunLeave;
