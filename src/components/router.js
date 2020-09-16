import React, { Component } from "react";
import Login from "./login";
import Register from "./register";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Routing extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Register} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </div>
    );
  }
}

export default Routing;
