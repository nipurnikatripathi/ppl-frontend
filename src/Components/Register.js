import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  userValidRegistrationPage,
  userEntriesInRegistrationPage,
} from "../redux";
import { RegisterUserPostApi } from "../Api/Authentication";

class Registration extends React.Component {
  constructor(props) {
    super(props);
  }
  // handleChange method - it is setting the state of properties with user entered values
  handleChange = (e) => {
    //Destructuring userEntriesInRegistrationPage function
    const { userEntriesInRegistrationPage } = this.props;
    const userData = { name: e.target.name, value: e.target.value };
    console.log("event in handlechange", userData.name);
    userEntriesInRegistrationPage(userData);
  };

  // handleSubmit method - it works when we submit our registeration form
  handleSubmit = (e) => {
    e.preventDefault(); // it prevents the default behaviour
    //Destructuring username,password, email, firstName, lastName, userValidRegistrationPage function

    const {
      username,
      password,
      email,
      firstName,
      lastName,
      userValidRegistrationPage,
    } = this.props;

    // User object - send this object to backend - Its order should be same as userschema  at the backend
    const user = {
      username,
      password,
      email,
      firstName,
      lastName,
    };

    // RegisterUserPostApi function
    RegisterUserPostApi(user).then((response) => {
      console.log("response --------", response);
      if (response?.data === false) {
        console.log("user already exists!");
        {
          userValidRegistrationPage("user exists");
        }
      } else {
        console.log("user registered successfully!");
        {
          userValidRegistrationPage("new user arrived");
        }
      }
    });
  };

  render() {
    console.log("inside reg.js");

    //Destructuring username,password, email, firstName, lastName, registerUser
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      registerUser,
    } = this.props;
    return (
      <div>
        <div>
          <meta charSet="utf-8" />
          <title>Create An Account</title>
          <div className="content_rgt">
            <div className="register_sec">
              {/* Registration form */}
              <h1>Create An Account</h1>
              {/* Form Starts */}
              <form onSubmit={this.handleSubmit}>
                {" "}
                <ul>
                  {/* Username Input */}
                  <li>
                    <span>Username</span>
                    <input
                      name="username"
                      type="text"
                      value={username}
                      placeholder="Enter your username"
                      onChange={this.handleChange}
                    />
                  </li>
                  {/* Password Input */}
                  <li>
                    <span>Password</span>
                    <input
                      name="password"
                      type="text"
                      value={password}
                      placeholder="Enter your password"
                      onChange={this.handleChange}
                    />
                  </li>
                  {/* Email Input */}
                  <li>
                    <span>Email</span>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      placeholder="Enter your email"
                      onChange={this.handleChange}
                    />
                  </li>
                  {/* First Name Input */}
                  <li>
                    <span>First Name</span>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      placeholder="Enter your first name"
                      onChange={this.handleChange}
                    />
                  </li>
                  {/* Last Name Input */}
                  <li>
                    <span>Last Name</span>
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      placeholder="Enter your last name"
                      onChange={this.handleChange}
                    />
                  </li>
                  {/* Submit Button - to submit form */}
                  <li>
                    <input type="submit" defaultValue="Register" />
                  </li>
                </ul>
              </form>
              <h4> {registerUser} </h4>
              {/* For Login */}
              <div className="addtnal_acnt">
                I already have an account.
                {/* Redirect to login page */}
                <Link to="/login" target="_self">
                  Login My Account !{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state in register.js", state);
  return {
    registerUser: state.registerReducer.registerUser,
    username: state.registerReducer.username,
    password: state.registerReducer.password,
    email: state.registerReducer.email,
    firstName: state.registerReducer.firstName,
    lastName: state.registerReducer.lastName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userValidRegistrationPage: (userData) =>
      dispatch(userValidRegistrationPage(userData)),
    userEntriesInRegistrationPage: (userData) =>
      dispatch(userEntriesInRegistrationPage(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
