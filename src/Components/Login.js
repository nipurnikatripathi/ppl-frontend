import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userValidLoginPage, userEntriesInLoginPage } from "../redux";
import { LoginUserPostApi } from "../Api/Authentication";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleChange method - it is setting the state of properties with user entered values
  handleChange = (e) => {
    // Destructure userEntriesInLoginPage function
    const { userEntriesInLoginPage } = this.props;
    const userData = { name: e.target.name, value: e.target.value };
    userEntriesInLoginPage(userData);
  };

  // handleSubmit method - it works when we submit our login form
  handleSubmit = (e) => {
    e.preventDefault(); // it prevents the default behaviour
    // Destructure email, password, userValidLoginPage
    const { email, password, userValidLoginPage } = this.props;
    //  obect - userLoggedin  - send to backend
    const userloggedin = {
      email,
      password,
    };
    const user = ""; // variable use for local storage

    // LoginUserPostApi function
    LoginUserPostApi(userloggedin).then((response) => {
      console.log("response --------", response);
      if (response?.data?.msg === "login successfully") {
        console.log("user logged in successfully!");
        localStorage.setItem("user", email);
        this.props.history.push("/timeline");
      } else if (response?.data?.msg === "invalid password") {
        console.log("invalid password!");
        userValidLoginPage("Invalid password!");
      } else {
        userValidLoginPage("Invalid email!");
      }
    });
  };

  render() {
    // Destructure email, password, loggedInUserCorrectly
    const { email, password, loggedInUserCorrectly } = this.props;
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Login Account</title>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link
          href="css/bootstrap-responsive.css"
          rel="stylesheet"
          type="text/css"
        />
        <div className="content_rgt">
          <div className="login_sec">
            {/* Login form starts */}
            <h1>Log In</h1>
            {/* method calls on clicking the submit button  */}
            <form onSubmit={this.handleSubmit}>
              {" "}
              <ul>
                {/* email id for login */}
                <li>
                  <span>Email-ID</span>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    placeholder="Enter your email"
                  />
                </li>
                {/* password for login */}
                <li>
                  <span>Password</span>
                  <input
                    type="text"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Enter your password"
                  />
                </li>
                <li>
                  {/* submit button for login form */}
                  <input type="submit" defaultValue="Log In" />
                  <a href>Forgot Password</a>
                </li>
              </ul>
              {/* Login form ends */}
            </form>
            {/* This text shows the current value of state loggedInUserCorrectly - valid user or invalid  */}
            <h4>{loggedInUserCorrectly}</h4>
            <div className="addtnal_acnt">
              I do not have any account yet.
              {/* Redirecting to registration page - if new user arrived */}
              <Link to="/register" target="_self">
                Create My Account Now !
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state in login.js", state);
  return {
    email: state.loginReducer.email,
    password: state.loginReducer.password,
    loggedInUserCorrectly: state.loginReducer.loggedInUserCorrectly,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userValidLoginPage: (userData) => dispatch(userValidLoginPage(userData)),
    userEntriesInLoginPage: (userData) =>
      dispatch(userEntriesInLoginPage(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
