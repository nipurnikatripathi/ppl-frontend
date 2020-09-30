import React from "react";
import Axios from "axios"; //importing Axios
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"; //importing Router
import Timeline from "./Timeline";
import ls from "local-storage";

// Login Component
class Login extends React.Component {
  // State of Login Component
  state = {
    userEmail: "", // email of user
    password: "", // password of user
    loggedInUserCorrectly: "", // to check valid user or not
  };
  // componentDidMount - After mounting the component
  componentDidMount() {
    // condition : if the user variable (having emailId) presents in local storage
    if (localStorage.getItem("user")) {
      console.log("user in local storage : ", localStorage.getItem("user"));
      // Redirecting to timeline page forcefully
      console.log("this.props in login: ", this.props);
      this.props.history.push("/timeline");
    }
  }

  // handleChange method - it is setting the state of properties with user entered values
  handleChange = (e) => {
    if (e.target.name === "email") {
      // condition : if value of target is equal to email
      this.setState({ [e.target.name]: e.target.value });
      console.log("handle change with email", e.target.value);
    } else {
      // condition : if value of target is equal to password
      this.setState({ [e.target.name]: e.target.value });
      console.log("handle change with password", e.target.value);
    }
  };

  // handleSubmit method - it works when we submit our login form
  handleSubmit = (e) => {
    e.preventDefault(); // it prevents the default behaviour

    //  obect - userLoggedin  - send to backend
    let userloggedin = {
      email: this.state.email,
      password: this.state.password,
    };

    const user = ""; // variable use for local storage

    // post call - at login API
    Axios.post(`http://localhost:8081/login`, userloggedin) // send userLoggedin object to backend
      .then((response) => {
        // if response received
        if (response.data.msg === "login successfully") {
          // condition : if data in response contaning message - login successfully
          console.log("user logged in successfully!");
          // this.props.loginUser();
          // console.log("this.prop.userloggedin", this.props.userloggedin);
          this.setState({
            loggedInUserCorrectly: "You are logged in successfully!",
          });
          // setting the value of user variable with the email in local storage
          localStorage.setItem("user", this.state.email);
          localStorage.setItem("userId");
          // redirecting to timeline page
          this.props.history.push("/timeline");
        } else if (response.data.msg === "invalid password") {
          //condition : if data in response contaning message - invalid password
          console.log("invalid password!");
          this.setState({
            loggedInUserCorrectly: "Invalid password!",
          });
        } else {
          // condition : if data in response contaning message - invalid email
          this.setState({
            loggedInUserCorrectly: "Invalid email!",
          });
        }
      })
      // if no response received
      .catch(function (error) {
        console.log("something is wrong !");
      });
  };

  render() {
    console.log("props in login", this.props);
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
                    value={this.state.email}
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
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Enter your password"
                  />
                </li>
                {/* checkbox  */}
                <li>
                  <input
                    name="rememberMe"
                    checked={this.state.rememberMe}
                    onChange={this.handleChange}
                    type="checkbox"
                  />{" "}
                  Remember me
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
            <h4>{this.state.loggedInUserCorrectly}</h4>
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
// exporting login component
export default Login;

//   render() {
//     return (
//       <div>
//         <meta charSet="utf-8" />
//         <title>Login Account</title>
//         <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
//         <link
//           href="css/bootstrap-responsive.css"
//           rel="stylesheet"
//           type="text/css"
//         />
//         <div className="navbar navbar-inverse navbar-fixed-top">
//           <div className="navbar-inner">
//             <div className="container">
//               <button
//                 type="button"
//                 className="btn btn-navbar"
//                 data-toggle="collapse"
//                 data-target=".nav-collapse"
//               >
//                 {" "}
//                 <span className="icon-bar" /> <span className="icon-bar" />{" "}
//                 <span className="icon-bar" />{" "}
//               </button>
//               <a className="brand" href>
//                 PPL
//               </a>
//               <div className="pro_info pull-right">
//                 <div className="pro_icn">
//                   <img src="images/pic_small.png" />
//                 </div>
//                 <div className="pro_txt">
//                   Me
//                   <b className="caret" />
//                 </div>
//                 <ul
//                   className="dropdown-menu"
//                   role="menu"
//                   aria-labelledby="dLabel"
//                 >
//                   <li>
//                     <a tabIndex={-1} href="#">
//                       My Profile
//                     </a>
//                   </li>
//                   <li>
//                     <a tabIndex={-1} href="#">
//                       Message Box
//                     </a>
//                   </li>
//                   <li>
//                     <a tabIndex={-1} href="#">
//                       Change Language
//                     </a>
//                   </li>
//                   <li className="divider" />
//                   <li>
//                     <a tabIndex={-1} href="#">
//                       <input type="text" placeholder="search" />
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//               <div className="nav-collapse collapse">
//                 <ul className="nav">
//                   <li className="active">
//                     {" "}
//                     <a href>Home</a>{" "}
//                   </li>
//                   <li className>
//                     {" "}
//                     <a href>E-Coupons</a>{" "}
//                   </li>
//                   <li className>
//                     {" "}
//                     <a href>E-Brands</a>{" "}
//                   </li>
//                   <li className>
//                     {" "}
//                     <a href>Resuse Market</a>{" "}
//                   </li>
//                   <li className>
//                     {" "}
//                     <a href>Lost and Found</a>{" "}
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="header">
//           <div className="header_lft">
//             <div className="logo">
//               <a href="#">
//                 <img src="images/logo.png" />
//               </a>
//             </div>
//             <div className="navigatn">
//               <ul>
//                 <li>
//                   <a href="#" className="active">
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#"> E-Coupons </a>
//                 </li>
//                 <li>
//                   <a href="#">E-Brands </a>
//                 </li>
//                 <li>
//                   <a href="#"> Resuse Market </a>
//                 </li>
//                 <li>
//                   <a href="#"> Lost and Found</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="header_rgt">
//             <div className="flag_div">
//               <img src="images/flag.png" />
//             </div>
//             <input type="text" placeholder="Search" className="txt_box" />
//             <div className="msg_box">
//               <a href="#">
//                 <span className="msg_count">100</span>
//               </a>
//             </div>
//             <div className="info_div">
//               <div className="image_div">
//                 {" "}
//                 <img src="images/pic.png" />{" "}
//               </div>
//               <div className="info_div1">Me</div>
//             </div>
//           </div>
//         </div>
//         <div className="container">
//           <div className="content">
//             <div className="content_rgt">
//               <div className="login_sec">
//                 {/* Login form starts */}
//                 <h1>Log In</h1>
//                 {/* method calls on clicking the submit button  */}
//                 <form onSubmit={this.handleSubmit}>
//                   {" "}
//                   <ul>
//                     {/* email id for login */}
//                     <li>
//                       <span>Email-ID</span>
//                       <input
//                         type="text"
//                         name="email"
//                         value={this.state.email}
//                         onChange={this.handleChange}
//                         placeholder="Enter your email"
//                       />
//                     </li>
//                     {/* password for login */}
//                     <li>
//                       <span>Password</span>
//                       <input
//                         type="text"
//                         name="password"
//                         value={this.state.password}
//                         onChange={this.handleChange}
//                         placeholder="Enter your password"
//                       />
//                     </li>
//                     {/* checkbox  */}
//                     <li>
//                       <input
//                         name="rememberMe"
//                         checked={this.state.rememberMe}
//                         onChange={this.handleChange}
//                         type="checkbox"
//                       />{" "}
//                       Remember me
//                     </li>
//                     <li>
//                       {/* submit button for login form */}
//                       <input type="submit" defaultValue="Log In" />
//                       <a href>Forgot Password</a>
//                     </li>
//                   </ul>
//                   {/* Login form ends */}
//                 </form>
//                 {/* This text shows the current value of state loggedInUserCorrectly - valid user or invalid  */}
//                 <h4>{this.state.loggedInUserCorrectly}</h4>
//                 <div className="addtnal_acnt">
//                   I do not have any account yet.
//                   {/* Redirecting to registration page - if new user arrived */}
//                   <Link to="/register" target="_self">
//                     Create My Account Now !
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="content_lft">
//               <h1>Welcome from PPL!</h1>
//               <p className="discrptn">
//                 There are many variations of passages of Lorem Ipsum available,
//                 but the majority have suffered alteration in some form, by
//                 injected humour, or randomised words which don't look even
//                 slightly believable. If you are going to use a passage of Lorem
//                 Ipsum, you need to be sure there isn't anything embarrassing
//                 hidden in the middle of text.{" "}
//               </p>
//               <img src="images/img_9.png" alt />
//             </div>
//           </div>
//         </div>
//         <div className="clear" />
//         <div className="footr">
//           <div className="footr_lft">
//             <div className="footer_div1">
//               Copyright © Pet-Socail 2014 All Rights Reserved
//             </div>
//             <div className="footer_div2">
//               <a href="#">Privacy Policy </a>|{" "}
//               <a href="#"> Terms &amp; Conditions</a>
//             </div>
//           </div>
//           <div className="footr_rgt">
//             <ul>
//               <li>
//                 <a href="#">
//                   <img src="images/social_1.png" />
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <img src="images/social_2.png" />
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <img src="images/social_3.png" />
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <img src="images/social_4.png" />
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// // exporting login component
// export default Login;
