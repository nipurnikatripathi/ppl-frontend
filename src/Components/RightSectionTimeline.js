import React, { Component } from "react";
import Modal from "./UpdateCategoryPopUp";
import Axios from "axios";
// import Popup from "./Popup"
import UploadPost from "./UploadPost";
import Popup from "./Popup";

export default class RightSectionTimeline extends Component {
  state = {
    modal: false,
    newCategory: "",
    categoryArray: [],
    username: "",
    userEmail: "",
    postModal: false,
  };
  postSelectModal = () => {
    console.log("before:", this.state.postModal);
    this.setState((prevState) => ({
      postModal: !prevState.postModal,
    }));
    console.log("after: ", this.state.postModal);
  };
  selectModal = (info) => {
    this.setState({ modal: !this.state.modal }); // true/false toggle
  };
  // postSelectModal = (info) => {
  //   this.setState({ postModal:  }); // true/false toggle
  //   console.log("After - postModal:", this.state.postModal);
  // };

  // categoryUpdateFunction method - receving data argument (new category from backend) from submitButtonCategory
  categoryUpdateFunction = (data) => {
    console.log("Inside category array function in timeline", data);
    // setting state of categoryArray with received data (category list)
    this.setState({ categoryArray: data });
  };

  // method - handleChange - to handle the updatecategory button
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // method - handleDeleteCategory - to handle the delete button in categor y
  handleDeleteCategory = (id, category) => {
    console.log("id of the clicked button : ", id, category);
    Axios({
      method: "delete",
      url: "http://localhost:8081/deleteCategory",
      data: category,
    })
      .then((res) => {
        console.log("response received :", res.data);
        fetch(`http://localhost:8081/getCategory`)
          .then((response) => response.json())
          .then((data) => {
            console.log("This is updated category data", data);

            this.setState({ categoryArray: data });
          });
        console.log("category: ", this.state.categoryArray);
      })
      .catch(function (error) {
        console.log("error received");
      });
  };
  componentDidMount() {
    fetch(`http://localhost:8081/getCategory`)
      .then((response) => response.json())
      .then((data) => {
        console.log("This is your data", data);

        this.setState({ categoryArray: data });
      });
    // console.log("categoryArray: ", this.state.categoryArray);
  }
  render() {
    const deleteCategory = {
      marginRight: "-1%",
      float: "right",
    };

    return (
      <div>
        {this.state.modal ? (
          <Modal
            displayModal={this.state.modal}
            closeModal={this.selectModal}
            categoryUpdateFunction={this.categoryUpdateFunction}
          />
        ) : (
          <div>
            {" "}
            {/*style={this.state.modal ? bodyStyle : {}}>*/}
            <div className="content_rgt">
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_iconb.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                {/* Upload Post link */}
                <div>
                  <a onClick={this.postSelectModal}>Upload Post</a>
                  {/* <UploadPost
                    displayModal={this.state.postModal}
                    // closeModal={this.postSelectModal}
                  />  */}
                </div>
                {/* <a href="#">Upload Post</a>{" "} */}
              </div>
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                {/* Add category link */}
                <div>
                  <div>
                    <a onClick={this.selectModal}>Add Category</a>
                  </div>
                </div>
                {/* <a onClick={this.updateCategory}>Update Category </a>{" "} */}
                {/* <a href="#" onClick={this.updateCategory}>
                    Update Category
                  </a>{" "} */}
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">
                  Categories
                </div>
                <div className="rght_list">
                  <ul>
                    <div>
                      {this.state.categoryArray.map((category, index) => (
                        <p key={index}>
                          <li>
                            <a href="#">
                              <span className="list_icon">
                                <img src="images/icon_05.png" alt="up" />
                              </span>{" "}
                              {category.categoryName} !{"     "}
                              <div style={deleteCategory}>
                                <button
                                  onClick={() =>
                                    this.handleDeleteCategory(index, category)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </a>
                          </li>
                        </p>
                      ))}
                    </div>
                  </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">
                  Featured
                </div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img1.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img2.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img3.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Popup
              displayModal={this.state.postModal}
              closeModal={this.postSelectModal}
              categoryArray = {this.state.categoryArray}
            />
          </div>
        )}
      </div>
    );
  }
}
