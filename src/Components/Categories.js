import React, { Component } from "react";

export default class categories extends Component {
    state = {
    modal: false,
  };
  selectModal = (info) => {
    this.setState({ modal: !this.state.modal }); // true/false toggle
  };




  render() {
    return (
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="rght_cate">
              <div className="rght_cate_hd" id="rght_cat_bg">
                Categories
              </div>
              <div className="rght_list">
                <ul>
                  <li>
                    <a href="#">
                      <span className="list_icon">
                        <img src="images/icon_01.png" alt="up" />
                      </span>{" "}
                      CATS
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="list_icon">
                        <img src="images/icon_02.png" alt="up" />
                      </span>{" "}
                      Dogs
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="list_icon">
                        <img src="images/icon_03.png" alt="up" />
                      </span>{" "}
                      Birds
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="list_icon">
                        <img src="images/icon_04.png" alt="up" />
                      </span>{" "}
                      Rabbit
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="list_icon">
                        <img src="images/icon_05.png" alt="up" />
                      </span>{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
