import React, { Component } from "react";
import "react-dropdown/style.css";
import { connect } from "react-redux";
import {
  categoryArrayInTimelinePage,
  uploadPostArrayInTimelinePage,
} from "../redux";
import {
  UploadPostPostApi,
  GetUploadPostFetchApi,
  GetUsernameFetchApi,
} from "../Api/Timeline";

class UploadPost extends Component {
  state = {
    description: "",
    category: "",
    selectedFile: null,
    categoryValue: "",
    userArray: [],
    userId: "",
    user: "",
  };

  // handleChange method - it is setting the state of properties with user entered values
  handleChange = (e) => {
    const { selectedFile } = this.state;
    if (e.target.name === "selectedFile") {
      this.setState({ selectedFile: e.target.files[0] }, () => {
        console.log(this.state);
      });
      console.log("e.target.files[0] -", e.target.files[0]);
      console.log("this.state.selectedFile:", selectedFile);
    } else if (e.target.name === "category") {
      console.log("category in handle change", e.target.value);
      this.setState({ categoryValue: e.target.value });
    } else this.setState({ [e.target.name]: e.target.value });
  };

  // handleSubmit method - it works when we submit our registeration form
  handleSubmit = (e) => {
    e.preventDefault(); // it prevents the default behaviour
    // Destriucture state categoryValue, userArray, description, selectedFile
    const { categoryValue, userArray, description, selectedFile } = this.state;
    //Destructure uploadPostArrayInTimelinePage, close
    const { uploadPostArrayInTimelinePage, close } = this.props;

    let userInLocalStorage = localStorage.getItem("user");
    let userId = "";
    {
      // traversing in userArray using map
      this.state.userArray.map((user, index) => {
        console.log("user array in map", user.email);
        if (user.email === userInLocalStorage) {
          console.log("user id in handle submit: ", user._id);
          userId = user._id;
        }
      });
    }

    let formData = new FormData(); //formdata object of upload post

    formData.append("description", description);
    formData.append("selectedFile", selectedFile);
    formData.append("category", categoryValue);
    formData.append("userid", userId);

    // UploadPostPostApi function
    UploadPostPostApi(formData).then((response) => {
      console.log("response from server:", response.data.msg);
      // GetUploadPostFetchApi function
      GetUploadPostFetchApi().then((data) => {
        console.log("data from response in left sectioon", data);
        uploadPostArrayInTimelinePage(data);
      });
    });

    close();
  };
  componentDidMount() {
    // Destructure uploadPostArrayInTimelinePage function
    const { uploadPostArrayInTimelinePage } = this.props;
    // GetUploadPostFetchApi function
    GetUploadPostFetchApi().then((response) => {
      console.log(
        "This is your upload post data from get call in upload post .js",
        response
      );
      uploadPostArrayInTimelinePage(response);
    });
    GetUsernameFetchApi().then((response) => {
      console.log(
        "This is your user array from get call in upload post",
        response
      );
      this.setState({ userArray: response });
    });
  }

  render() {
    const { categoryArray, uploadPostArray } = this.props;
    const { description } = this.state;
    console.log("category array in upload post:", categoryArray);
    console.log("uploadpost array in upload post:", uploadPostArray);
    console.log("userArray in upload post@@@@@@@@@@",this.state.userArray);

    return (
      <div className="post">
        {/* form starts */}
        <form onSubmit={this.handleSubmit}>
          {" "}
          <ul>
            {/* Description */}
            <li>
              <br />
              <textarea
                id="description"
                name="description"
                type="text"
                value={description}
                placeholder="Describe your post"
                onChange={this.handleChange}
                required
              />
            </li>
            {/* file upload */}
            <li>
              <br />
              <input
                id="fileUpload"
                name="selectedFile"
                type="file"
                placeholder="Insert image file"
                onChange={this.handleChange}
                required
              />

              <br />
            </li>
            {/* category */}
            <li>
              <br />
              <br />
              <select
                name="category"
                id="category"
                onChange={this.handleChange}
                required
              >
                <option value="">Select category</option>
                {categoryArray.map((category, index) => (
                  <option value={category._id}>{category.categoryName}</option>
                ))}
              </select>
            </li>
          </ul>
          <br />
          <div className="divStyle">
            <input className="submitStyle " type="submit" />
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state in upload post ", state);
  return {
    categoryArray: state.timelineReducer.categoryArray,
    uploadPostArray: state.timelineReducer.uploadPostArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    categoryArrayInTimelinePage: () => dispatch(categoryArrayInTimelinePage()),
    uploadPostArrayInTimelinePage: (userData) =>
      dispatch(uploadPostArrayInTimelinePage(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPost);
