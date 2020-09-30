import React from "react";
import "./App.css";
import Routing from "./Components/Router";
import { BrowserRouter as Router } from "react-router-dom";
// import Timeline from "./components/timeline";

export default class App extends React.Component {
  render() {
    return (
      <Router>
          <Routing />
      </Router>
    );
  }
}




