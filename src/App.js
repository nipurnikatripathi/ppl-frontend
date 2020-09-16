import React from "react";
import "./App.css";
import Routing from "./components/router";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Routing />
        </div>
      </Router>
    );
  }
}
