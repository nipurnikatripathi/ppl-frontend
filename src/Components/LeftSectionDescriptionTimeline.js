import React, { Component } from "react";
import Axios from 'axios'

export default class LeftSectionTimeline extends Component {
  state = {
    username: "",
    userEmail: "",
  };
  componentDidMount() {
    let userName = localStorage.getItem("user");
    console.log("userName in component did mount :", userName);

    // post call at addusername API
    Axios.post(`http://localhost:8081/addusername`, { userEmail: userName }) // send user object to backend
      .then((response) => {
        this.setState({
          username: response.data[0].username + " " + response.data[0].lastName,
          userEmail: response.data[0].email,
        });

        console.log(
          "inside addusername api in timeline",
          response.data[0].username
        );
      }) // if no response received
      .catch(function (error) {
        console.log("something is wrong inside addusername api in timeline!");
      });
  }

  
  render() {
    return (
      <div>
        {/* <div className="content_lft"> */}
          <div className="contnt_1">
            <div className="list_1">
              <ul>
                <li>
                  <input type="checkbox" className="chk_bx" />
                  Friends
                </li>
                <li>
                  <input type="checkbox" className="chk_bx" />
                  Flaged
                </li>
              </ul>
            </div>
            <div className="timeline_div">
              <div className="timeline_div1">
                <div className="profile_pic">
                  <img src="images/timeline_img1.png" />
                  <div className="profile_text">
                    <a href="#">Change Profile Pic</a>
                  </div>
                </div>
                <div className="profile_info">
                  <div className="edit_div">
                    <a href="#">
                      Edit <img src="images/timeline_img.png" />
                    </a>
                  </div>
                  <div className="profile_form">
                    <ul>
                      <li>
                        <div className="div_name1">
                          Name :<h5>{this.state.username}</h5>
                        </div>
                        {/* <div className="div_name2">
                                {/* {this.props.sendData.username} 
                              </div> */}
                      </li>
                      <li>
                        <div className="div_name1">
                          Email :<h6>{this.state.userEmail}</h6>
                        </div>

                        {/* <div className="div_name2">Female</div> */}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="timeline_div2">
                <ul>
                  <li>
                    <a href="#" className="active">
                      Timeline{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">About </a>
                  </li>
                  <li>
                    <a href="#">Album</a>
                  </li>
                  <li>
                    <a href="#"> Pets</a>
                  </li>
                  <li>
                    <a href="#">My Uploads </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        {/* </div> */}
      </div>
    );
  }
}
