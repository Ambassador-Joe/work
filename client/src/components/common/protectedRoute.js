import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <Route
      {...rest}
      element={isAuth ? element : <Navigate to="/loginPage" />}
    />
  );
};

export default ProtectedRoute;
