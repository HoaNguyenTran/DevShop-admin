import { Redirect, Route } from "react-router";
import React from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      component={(props) => {
        const token = window.localStorage.getItem("token");
        if (token) return <Component {...props} />;
        else return <Redirect to={"/signin"} />;
      }}
      {...rest}
    />
  );
};

export default PrivateRoute;
