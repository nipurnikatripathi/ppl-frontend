import React from "react";
import LeftSectionDescriptionTimeline from "../Components/LeftSectionDescriptionTimeline";
import LeftSectionPostTimeline from "../Components/LeftSectionPostTimeline";
import RightSectionTimeline from "../Components/RightSectionTimeline";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function TimelinePage(props) {
  console.log("props in timeline page :", props);
  const postArray= [1];
  const isLoggedIn = true;
  return (
    <div>
      {" "}
      <Header {...props} userLoggedin = {isLoggedIn} />
      <div className="container">
        <div className="content">
          <meta charSet="utf-8" />
          <div className="content_lft">
            <LeftSectionDescriptionTimeline {...props} />
            <LeftSectionPostTimeline {...props}  />
          </div>

          <RightSectionTimeline {...props} />
        </div>
      </div>
      <div className="clear" />
      <Footer />
    </div>
  );
}
