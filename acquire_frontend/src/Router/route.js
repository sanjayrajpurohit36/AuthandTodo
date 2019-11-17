import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "../Component/auth/signup/signup";
import Login from "../Component/auth/login/login";
import Dashboard from "../Component/dashboard/dashboard";
import Profile from "../Component/profile/profile";
const Routes = (
  <Router>
    <Route path={"/"} component={SignUp} exact />
    <Route path={"/login"} component={Login} exact />
    <Route path={"/dashboard"} component={Dashboard} exact />
    <Route path={"/dashboard/profile"} component={Profile} exact />
  </Router>
);
export default Routes