import React from "react";
// import { connect } from "react-redux";
// import { USER } from "../../actions";
// import { OutlinedInput } from "../../components/inputs";
import { OutlinedButton } from "../../components/buttons";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Logo from "../../images/logo.svg";

const UpdateEmp = () => (
  <div className="screen">
    <Paper className="form-container" elevation={1}>
      <div className="logo-container">
        <img src={Logo} height="200" width="200" alt="logo" />
      </div>

      <OutlinedButton text="Get All Employees" />

      <div>
        <ul>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
        </ul>
      </div>

      <div className="links-container">
        <Link to="/home">Get All Employees</Link>
        <Link to="/get-employee">Find an Employee</Link>
        <Link to="/delete-employee">Delete an Employee</Link>
        <Link to="update-employee">Update an Employee</Link>
      </div>
    </Paper>
  </div>
);

export default UpdateEmp;
