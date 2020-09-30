import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import Login from "./login";
// import Register from "./register";
// import Timeline from "./timeline";
import Header from "./Header";
import Footer from "./Footer";
import RegisterPage from "../Page/RegisterPage";
import LoginPage from "../Page/LoginPage";
import TimelinePage from "../Page/TimelinePage";

class Routing extends Component {
  constructor(props) {
    super(props);
    // this.state = { userLoggedIn: false };
  }
  render() {
    return (
      <div>
        {/* <Header userLoggedIn={this.state.userLoggedIn} /> */}

        <Switch>
          <Route path={["/", "/Register"]} exact component={RegisterPage} />
          <Route path="/Login" exact component={LoginPage} />
          <Route path="/Timeline" exact component={TimelinePage} />
        </Switch>
      </div>
    );
  }
}

export default Routing;
