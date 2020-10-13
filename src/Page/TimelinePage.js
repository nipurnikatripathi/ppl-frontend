import React, { Component } from "react";
import LeftSectionDescriptionTimeline from "../Components/LeftSectionDescriptionTimeline";
import LeftSectionPostTimeline from "../Components/LeftSectionPostTimeline";
import RightSectionTimeline from "../Components/RightSectionTimeline";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {AddUsernamePostApi} from "../Api/Timeline"

export default class TimelinePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      userName: "",
      userEmail: "",
    };
  }
  componentDidMount() {
    const userName = localStorage.getItem("user");
    console.log("userName in component did mount timeline page :", userName);
    const userEmail = {
      userEmail : userName
    };
//AddUsernamePostApi function
    AddUsernamePostApi(userEmail)
    .then((response) => {
        this.setState({
          userName: response?.data[0]?.username, // + " " + response.data[0].lastName,
          userEmail: response?.data[0]?.email,
        });

        console.log("username in time line page", response?.data[0]?.username);
      }) 
      .catch(function (error) {
        console.log("something is wrong inside addusername api in timeline!");
      });
  }

  render() {
    const {isLoggedIn,userName, userEmail} = this.state;
    return (
      <div>
        {" "}
        <Header
          {...this.props}
          userLoggedIn= {isLoggedIn}
          userName={userName}
        />
        <div className="container">
          <div className="content">
            <meta charSet="utf-8" />
            <div className="content_lft">
              <LeftSectionDescriptionTimeline
                {...this.props}
                userName={userName}
                userEmail={userEmail}
              />
              <LeftSectionPostTimeline {...this.props} />
            </div>

            <RightSectionTimeline {...this.props} />
          </div>
        </div>
        <div className="clear" />
        <Footer />
      </div>
    );
  }
}
