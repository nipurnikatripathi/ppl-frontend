import React from "react";
import Section from "../Components/Section";
import Registeration from "../Components/Register";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function RegisterPage(props) {
  return (
    <div>
      {" "}
      <Header {...props} />
      <div className="container">
        <div className="content">
          <Section />
          <Registeration />
        </div>
      </div>
      <div className="clear" />
      <Footer />
    </div>
  );
}
