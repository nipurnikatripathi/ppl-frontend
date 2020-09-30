import React from "react";
import Axios from "axios"; // importing Axios
import Timeline from "./Timeline";
import { Link, Switch } from "react-router-dom"; // importing Router

// Registration Component
class Registration extends React.Component {
  // State of Register Component
  state = {
    username: "", // username of registered user
    password: "", // password
    email: "", // email
    firstName: "", // first name
    lastName: "", // last name
    registerUser: "",
  };

  // handleChange method - it is setting the state of properties with user entered values
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // handleSubmit method - it works when we submit our registeration form
  handleSubmit = (e) => {
    e.preventDefault(); // it prevents the default behaviour

    // User object - send this object to backend - Its order should be same as userschema  at the backend
    let user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };

    // post call at regisetr API
    Axios.post(`http://localhost:8081/register`, user) // send user object to backend
      .then((response) => {
        // response received from backend
        if (response.data === false) {
          // checking the data of received response is equal to false
          console.log("user already exists!");
          this.setState({ registerUser: "THIS USERNAME ALREADY EXISTS !!" });
        } else {
          // if the data of received response is equal to true
          console.log(response.data);
          console.log("user registered successfully!");
          this.setState({
            registerUser: `${this.state.username} register successfully !!`.toUpperCase(),
          });
        }
      }) // if no response received
      .catch(function (error) {
        console.log("something is wrong !");
      });
  };

  render() {
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
                      value={this.state.username}
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
                      value={this.state.password}
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
                      value={this.state.email}
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
                      value={this.state.firstName}
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
                      value={this.state.lastName}
                      placeholder="Enter your last name"
                      onChange={this.handleChange}
                    />
                  </li>
                  {/* Checkbox  */}
                  <li>
                    <input type="checkbox" />I agree to Term &amp; Conditions
                  </li>
                  {/* Submit Button - to submit form */}
                  <li>
                    <input type="submit" defaultValue="Register" />
                  </li>
                </ul>
              </form>
              {/* Registration Form Ends */}
              {/* This text shows the current value of state regiterUser - user alredy exists OR new user  */}
              <h4>{this.state.registerUser}</h4>
              {/* For Login */}
              <div className="addtnal_acnt">
                I already have an account.
                {/* Redirection to login page */}
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
export default Registration;

// render() {
//   return (
//     <div>
//       <div>
//         <meta charSet="utf-8" />
//         <title>Create An Account</title>

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
//               <div className="register_sec">
//                 {/* Registration form */}
//                 <h1>Create An Account</h1>
//                 {/* Form Starts */}
//                 <form onSubmit={this.handleSubmit}>
//                   {" "}
//                   <ul>
//                     {/* Username Input */}
//                     <li>
//                       <span>Username</span>
//                       <input
//                         name="username"
//                         type="text"
//                         value={this.state.username}
//                         placeholder="Enter your username"
//                         onChange={this.handleChange}
//                       />
//                     </li>
//                     {/* Password Input */}
//                     <li>
//                       <span>Password</span>
//                       <input
//                         name="password"
//                         type="text"
//                         value={this.state.password}
//                         placeholder="Enter your password"
//                         onChange={this.handleChange}
//                       />
//                     </li>
//                     {/* Email Input */}
//                     <li>
//                       <span>Email</span>
//                       <input
//                         type="text"
//                         name="email"
//                         value={this.state.email}
//                         placeholder="Enter your email"
//                         onChange={this.handleChange}
//                       />
//                     </li>
//                     {/* First Name Input */}
//                     <li>
//                       <span>First Name</span>
//                       <input
//                         type="text"
//                         name="firstName"
//                         value={this.state.firstName}
//                         placeholder="Enter your first name"
//                         onChange={this.handleChange}
//                       />
//                     </li>
//                     {/* Last Name Input */}
//                     <li>
//                       <span>Last Name</span>
//                       <input
//                         type="text"
//                         name="lastName"
//                         value={this.state.lastName}
//                         placeholder="Enter your last name"
//                         onChange={this.handleChange}
//                       />
//                     </li>
//                     {/* Checkbox  */}
//                     <li>
//                       <input type="checkbox" />I agree to Term &amp;
//                       Conditions
//                     </li>
//                     {/* Submit Button - to submit form */}
//                     <li>
//                       <input type="submit" defaultValue="Register" />
//                     </li>
//                   </ul>
//                 </form>
//                 {/* Registration Form Ends */}
//                 {/* This text shows the current value of state regiterUser - user alredy exists OR new user  */}
//                 <h4>{this.state.registerUser}</h4>
//                 {/* For Login */}
//                 <div className="addtnal_acnt">
//                   I already have an account.
//                   {/* Redirection to login page */}
//                   <Link to="/login" target="_self">
//                     Login My Account !
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="content_lft">
//               <h1>Welcome from PPL!</h1>
//               <p className="discrptn">
//                 There are many variations of passages of Lorem Ipsum
//                 available, but the majority have suffered alteration in some
//                 form, by injected humour, or randomised words which don't look
//                 even slightly believable. If you are going to use a passage of
//                 Lorem Ipsum, you need to be sure there isn't anything
//                 embarrassing hidden in the middle of text.{" "}
//               </p>
//               <img src="images/img_9.png" alt="" />{" "}
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
//     </div>
//   );
//   }
// }
// // exporting the Registration Component
// export default Registration;
