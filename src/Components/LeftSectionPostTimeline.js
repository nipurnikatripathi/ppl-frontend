import React, { Component } from "react";
// import Moment from 'react-moment';
// import 'moment-timezone';
import moment from "moment";

export default class LeftSectionPostTimeline extends Component {
  state = {
    uploadPostArray: [],
    post: "abc",
    description: "",
    img: "",
  };
  componentDidMount() {
    fetch(`http://localhost:8081/getUploadPost`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data from response in left sectioon", data);
        this.setState({ uploadPostArray: data });
        console.log(
          "upload post array on left section timeline:",
          this.state.uploadPostArray
        );
      });
  }
  render() {
    console.log("props in left section timeline", this.props);

    // let { description } = this.state;
    // let { img } = this.state;
    // if (this.state.uploadPostArray[0]) {
    //   description = this.state.uploadPostArray[0].description;
    //   img = this.state.uploadPostArray[0].filename;
    //   console.log("img", img);
    //   console.log("http://localhost:8081/style.png");
    // }
    // console.log("this.props:", this.props);
    // console.log("this.state:", this.state);
    console.log(
      "upload post array in leftsectiontimeline:",
      this.state.uploadPostArray
    );
    console.log(moment().format("YYYY.MM.DD"));
    return (
      <div>
        {this.state.uploadPostArray.map((uploadPost, index) => {
          console.log("upload post in map :", uploadPost);
          return (
            <div className="contnt_2">
              <div className="div_a">
                <div className="div_title">
                  User Interface PSD Source files Web Designing for web
                </div>
                <div className="btm_rgt">
                  <div className="btm_arc">
                    {uploadPost.category.categoryName}
                  </div>
                </div>
                <div className="div_top">
                  <div className="div_top_lft">
                    <img src="images/img_6.png" />
                     {uploadPost.userid.firstName}{" "}{uploadPost.userid.lastName}
                  </div>
                  <div className="div_top_rgt">
                    <span className="span_date">
                      {moment(uploadPost.currentdate).format(
                        "DD MMM YYYY, hh : mm A"
                      )}{" "}
                      {/* {new Date(uploadPost.currentdate).toLocaleDateString()}{" "}
                       */}{" "}
                    </span>
                    <span className="span_time">
                      {/* time:
                      {moment(new Date(uploadPost.currentdate)).format("HH:MM AM")}{" "} */}
                    </span>
                  </div>
                </div>
                <div>
                  <h1> {uploadPost.description}</h1>
                </div>
                <div className="div_image">
                  <img
                    src={"http://localhost:8081/" + uploadPost.filename}
                    alt="peto"
                  />
                </div>
                <div className="div_btm">
                  <div className="btm_list">
                    <ul>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="images/icon_001.png" alt="share" />
                          </span>
                          Share
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="images/icon_002.png" alt="share" />
                          </span>
                          Flag
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="images/icon_003.png" alt="share" />
                          </span>
                          0 Likes
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="images/icon_004.png" alt="share" />
                          </span>
                          4 Comments
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
