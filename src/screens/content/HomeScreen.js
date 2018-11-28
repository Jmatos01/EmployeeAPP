import React, { Component } from "react";
// import { connect } from "react-redux";
// import { USER } from "../../actions";
// import { OutlinedInput } from "../../components/inputs";
import { OutlinedButton } from "../../components/buttons";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Logo from "../../images/logo.svg";

// const HomeScreen = () => (
//   <div className="screen">
//     <Paper className="form-container" elevation={1}>
//       <div className="logo-container">
//         <img src={Logo} height="200" width="200" alt="logo" />
//       </div>

//       <OutlinedButton text="Get All Employees" />

//       <div>
//         <ul>
//           <li>Hello</li>
//           <li>Hello</li>
//           <li>Hello</li>
//           <li>Hello</li>
//           <li>Hello</li>
//         </ul>
//       </div>

//       <div className="links-container">
//         <Link to="/home">Get All Employees</Link>
//         <Link to="/get-employee">Find an Employee</Link>
//         <Link to="/delete-employee">Delete an Employee</Link>
//         <Link to="update-employee">Update an Employee</Link>
//       </div>
//     </Paper>
//   </div>
// );

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      displayEmployees: false
    };
  }

  displayEmployees = () => {
    this.setState({
      displayEmployees: !this.state.displayEmployees
    });
  };

  componentDidMount() {
    fetch("http://localhost:3002/employees")
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          isLoaded: true,
          items: json
        });
      });
    // fetch("http://localhost:3002/employees", {
    //   method: "GET",
    //   mode: "no-cors",
    //   headers: { "Content-Type": "application/json" }
    // }).then(function(res) {
    //   console.log(res);
    //   this.setState({
    //     isLoaded: true,
    //     items: res.json
    //   });
    // });
  }

  render() {
    var { isLoaded, items } = this.state;
    // let employees = null;

    // if (this.state.displayEmployees) {
    //   return (
    //     <div>
    //          { this.state.employees.map((List, index) => {
    //               return <List key={List.EmpCode}
    //               title={List.EmpCode} />
    //          })}
    //     </div>
    //     )
    // }

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="screen">
          <Paper className="form-container" elevation={1}>
            <div className="logo-container">
              <img src={Logo} height="200" width="200" alt="logo" />
            </div>
            <button className="EmpBtn" onClick={this.displayEmployees}>
              View All Employees
            </button>
         
            {this.state.displayEmployees &&
                   <div className="HomeScreen">
                   <ul>
                     {items.map(item => (
                       <li key={item.EmpID}>
                         ID: {item.EmpID} | Name: {item.Name} | Position:{" "}
                         {item.EmpCode} | Salary: {item.Salary}
                       </li>
                     ))}
                     ;
                   </ul>
                 </div>
            }









       
            <div className="links-container">
              <Link to="/home">Get All Employees</Link>
              <Link to="/get-employee">Find an Employee</Link>
              <Link to="/delete-employee">Delete an Employee</Link>
              <Link to="update-employee">Update an Employee</Link>
            </div>
          </Paper>
        </div>
      );
    }
  }
}

export default HomeScreen;
