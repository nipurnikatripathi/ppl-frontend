import React, { Component } from "react";
import { connect } from "react-redux";
import Popup from "./Popup";
import { categoryArrayInTimelinePage } from "../redux";
import { DeleteCategoryDeleteApi, GetCategoryFetchApi } from "../Api/Timeline";

class RightSectionTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      newCategory: "",
      username: "",
      userEmail: "",
      postModal: false,
    };
  }
  postSelectModal = () => {
    const { postModal } = this.state;
    console.log("before:", postModal);
    this.setState((prevState) => ({
      postModal: !prevState.postModal,
    }));
    console.log("after: ", postModal);
  };
  selectModal = (info) => {
    const { modal } = this.state;

    console.log("modal selected----", modal);
    this.setState({
      modal: !modal,
    });
  };

  // categoryUpdateFunction method - receving data argument (new category from backend) from submitButtonCategory
  categoryUpdateFunction = (data) => {
    const { categoryArrayInTimelinePage } = this.props;
    console.log("Inside category array function in timeline", data);
    categoryArrayInTimelinePage(data);
  };

  // method - handleChange - to handle the updatecategory button
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // method - handleDeleteCategory - to handle the delete button in categor y
  handleDeleteCategory = (id, category) => {
    const { categoryArrayInTimelinePage, categoryArray } = this.props;
    DeleteCategoryDeleteApi(category).then((res) => {
      console.log("response received :", res.data);
      GetCategoryFetchApi().then((data) => {
        console.log("This is updated category data", data);
        categoryArrayInTimelinePage(data);
      });

      console.log(
        "category after deletion in right section timeline  ",
        categoryArray
      );
    });
  };
  componentDidMount() {
    const { categoryArrayInTimelinePage } = this.props;
    fetch(`http://localhost:8081/getCategory`)
      .then((response) => response.json())
      .then((data) => {
        console.log("This is your data", data);
        categoryArrayInTimelinePage(data);
      });
  }
  render() {
    const deleteCategory = {
      marginRight: "-1%",
      float: "right",
    };
    const { categoryArray } = this.props;
    const { modal, postModal } = this.state;
    console.log("category array with destructuring:", categoryArray);

    return (
      <div>
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
            </div>
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
          </div>
          <div className="rght_cate">
            <div className="rght_cate_hd" id="rght_cat_bg">
              Categories
            </div>
            <div className="rght_list">
              <ul>
                <div>
                  {categoryArray.map((category, index) => (
                    <p key={index}>
                      <li>
                        <a href="#">
                          <span className="list_icon">
                            <img src="images/icon_05.png" alt="up" />
                          </span>{" "}
                          {category.categoryName} !{"     "}
                          {/* Delete button to delete category */}
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

        <Popup displayModal={modal} closeModal={this.selectModal} />
        <Popup
          isPost
          displayModal={postModal}
          closeModal={this.postSelectModal}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state in RightSectionTimeline ", state);
  return {
    categoryArray: state.timelineReducer.categoryArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    categoryArrayInTimelinePage: (userData) =>
      dispatch(categoryArrayInTimelinePage(userData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSectionTimeline);
