import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Axios from "axios";

export default class UploadPost extends Component {
  state = {
    description: "",
    category: "",
    selectedFile: null,
    categoryArray: [],
    categoryValue: "",
    userArray: [],
    userId: "",
    user: "",
  };
  // handleChange method - it is setting the state of properties with user entered values
  handleChange = (e) => {
    if (e.target.name === "selectedFile") {
      this.setState({ selectedFile: e.target.files[0] }, () => {
        console.log(this.state);
      });
      console.log("e.target.files[0] -", e.target.files[0]);
      console.log("this.state.selectedFile:", this.state.selectedFile);
    } else if (e.target.name === "category") {
      this.setState({ categoryValue: e.target.value });
    } else this.setState({ [e.target.name]: e.target.value });
  };

  // handleSubmit method - it works when we submit our registeration form
  handleSubmit = (e) => {
    e.preventDefault(); // it prevents the default behaviour
    console.log(
      "category value in handle submit of upload post",
      this.state.categoryValue
    );
    let userInLocalStorage = localStorage.getItem("user");
    let userId = "";
    console.log("user from local storage",userInLocalStorage);
    {this.state.userArray.map((user, index) => { 
      console.log("user array in map",user.email);
       if(user.email === userInLocalStorage){
        console.log("user id in handle submit: ",user._id)
        userId = user._id
       }

    })}

    console.log("description", this.state.description);
    console.log("file upload", this.state.selectedFile);
    console.log("user id:",userId);

    let formData = new FormData(); //formdata object

    formData.append("description", this.state.description); //append the values with key, value pair
    formData.append("selectedFile", this.state.selectedFile);
    formData.append("category", this.state.categoryValue);
    formData.append("userid", userId);


    Axios({
      method: "post",
      url: "http://localhost:8081/uploadPost",
      data: formData,
      headers: { "content-type": "multipart/form-data" },
    }).then((response) => {
      console.log("response from server:", response.data.msg);
    });

    this.props.close();
  };
  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:8081/getCategory`),
      fetch(`http://localhost:8081/getUsername`),
    ])

      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([res1, res2]) => {
        console.log(
          "This is your category data from get call in updated category",
          res1
        );
        this.setState({ categoryArray: res1 });

        console.log(
          "This is your user array from get call in upload post",
          res2
        );
        this.setState({ userArray: res2 });
      });
  }

  // async componentDidMount() {
  //   const getCategoryResponse = await fetch(
  //     `http://localhost:8081/getCategory`
  //   ).then((res) => res.json());
  //   const getUploadPostResponse = await fetch(
  //     `http://localhost:8081/getUploadPost`
  //   ).then((res) => res.json());
  //   const categoryArray = getCategoryResponse.results;
  //   const uploadPostArray = getUploadPostResponse.results;

  //   this.setState({ categoryArray: categoryArray });
  // }

  render() {
    console.log("category array in upload post:", this.props.categoryArray);
    console.log("uploadpost array in upload post:", this.state.uploadPostArray);
   // console.log("user array", this.state.userArray);
    // let userInLocalStorage = localStorage.getItem("user");
    // let userId = "";
    // console.log("user from local storage",userInLocalStorage);
    // {this.state.userArray.map((user, index) => { 
    //   console.log("user array in map",user.email);
    //    if(user.email === userInLocalStorage){
    //     console.log("user id : ",user._id)
    //     userId = user._id
    //    }

    // })}
    // console.log("user id outsid map",userId);
    // this.setState({userId: 0});
    // console.log("userId in state:", this.state.userId);



    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {" "}
          <ul>
            <li>
              <span>Description</span>
              <br />
              <textarea
                id="description"
                name="description"
                type="text"
                value={this.state.description}
                rows="5"
                cols="5"
                placeholder="Describe your post"
                onChange={this.handleChange}
              />
            </li>
            <li>
              <br />
              <input
                id="fileUpload"
                name="selectedFile"
                type="file"
                placeholder="Insert image file"
                onChange={this.handleChange}
              />

              <br />
            </li>
            <li>
              <button type="button" onClick={this.onClickHandler}>
                Upload
              </button>
            </li>
            <li>
              <br />

              <span>choose category </span>
              <br />
              <select
                name="category"
                value={this.state.categoryValue}
                onChange={this.handleChange}
              >
                {this.state.categoryArray.map((category, index) => (
                  <option value={category._id}>{category.categoryName}</option>
                ))}
              </select>
            </li>
            <li>
              <br />
              <input type="submit" />
            </li>
          </ul>
        </form>
      </div>
    );
  }
}
