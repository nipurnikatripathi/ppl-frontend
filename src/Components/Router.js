import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import RegisterPage from "../Page/RegisterPage";
import LoginPage from "../Page/LoginPage";
import TimelinePage from "../Page/TimelinePage";
import store from "../redux/store";
import SinglePost from "./SinglePost";

class Routing extends Component {
  render() {
    return (
      <Provider store={store}>
          <Switch>
            <Route path={["/", "/Register"]} exact component={RegisterPage} />
            <Route path="/Login" exact component={LoginPage} />
            <Route path="/Timeline" exact component={TimelinePage} />
            <Route path="/SinglePost" exact component={SinglePost} />
          </Switch>
      </Provider>
    );
  }
}

export default Routing;
