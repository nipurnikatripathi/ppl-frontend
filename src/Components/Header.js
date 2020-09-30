import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = { userLoggedIn: false, username: "" };
  }

  // method - handleLogout - to handle the logout button
  handleLogout = (e) => {
    e.preventDefault(); // prevents default behaviour
    console.log("handle logout function");
    alert("Do you want to LOGOUT ?");
    localStorage.clear(); // clear the local storage
    this.props.history.push("/login"); // forcefully redirect to login page
  };
  componentDidMount() {
    let userName = localStorage.getItem("user");
    console.log("userName in component did mount of Header:", userName);

    // post call at addusername API
    Axios.post(`http://localhost:8081/addusername`, { userEmail: userName }) // send user object to backend
      .then((response) => {
        this.setState({
          username: response.data[0].username,
        });

        console.log(
          "inside addusername api in timeline",
          response.data[0].username
        );
      }) // if no response received
      .catch(function (error) {
        console.log("something is wrong inside addusername api in timeline!");
      });
  }

  render() {
    console.log("this.props.history",this.props.history)
    console.log("props in header:", this.props);
    console.log("userLogged in from timeline", this.props.userLoggedIn);
    return (
      <div>
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button
                type="button"
                className="btn btn-navbar"
                data-toggle="collapse"
                data-target=".nav-collapse"
              >
                {" "}
                <span className="icon-bar" /> <span className="icon-bar" />{" "}
                <span className="icon-bar" />{" "}
              </button>
              <a className="brand" href>
                PPL
              </a>
              <div className="pro_info pull-right">
                <div className="pro_icn">
                  <img src="images/pic_small.png" />
                </div>
                <div className="pro_txt">
                  Me
                  <b className="caret" />
                </div>
                <ul
                  className="dropdown-menu"
                  role="menu"
                  aria-labelledby="dLabel"
                >
                  <li>
                    <a tabIndex={-1} href="#">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a tabIndex={-1} href="#">
                      Message Box
                    </a>
                  </li>
                  <li>
                    <a tabIndex={-1} href="#">
                      Change Language
                    </a>
                  </li>
                  <li className="divider" />
                  <li>
                    <a tabIndex={-1} href="#">
                      <input type="text" placeholder="search" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
                  <li className="active">
                    {" "}
                    <a href>Home</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>E-Coupons</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>E-Brands</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>Resuse Market</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>Lost and Found</a>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <div className="header_lft">
            <div className="logo">
              <a href="#">
                <img src="images/logo.png" />
              </a>
            </div>
            <div className="navigatn">
              <ul>
                <li>
                  <a href="#" className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#"> E-Coupons </a>
                </li>
                <li>
                  <a href="#">E-Brands </a>
                </li>
                <li>
                  <a href="#"> Resuse Market </a>
                </li>
                <li>
                  <a href="#"> Lost and Found</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header_rgt">
            <div className="flag_div">
              <img src="images/flag.png" />
            </div>
            <input type="text" placeholder="Search" className="txt_box" />
            <div className="msg_box">
              <a href="#">
                <span className="msg_count">100</span>
              </a>
            </div>
            <div className="info_div">
              {this.props.userLoggedin ? (
                <div>
                  <div className="info_div1">
                    {" "}
                    <a onClick={this.handleLogout}>
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        //  size="1x"
                        color="white"
                      />
                    </a>
                    {/* <img src="images/pic.png" />{" "} */}
                  </div>
                  <div className="info_div">
                    {" "}
                    <h6>{this.state.username}</h6>
                  </div>
                </div>
              ) : null}
              <div className="">
                {/* <h6>{this.state.username}</h6> */}
                {/* Logout button */}
                {/* <a style={logoStyle}  */}
                {/* <a onClick={this.handleLogout}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="lg"
                    color="black"
                  />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// exporting the Registration Component
export default Header;
