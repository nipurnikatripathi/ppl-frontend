import React from "react";
import Section from "../Components/Section";
import Login from "../Components/Login";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function LoginPage(props) {
  console.log("props in login page ", props);
  return (
    <div>
      <Header {...props} />
      <div className="container">
        <div className="content">
          <Section />
          <Login {...props} />
        </div>
      </div>
      <div className="clear" />
      <Footer />
    </div>
  );
}
