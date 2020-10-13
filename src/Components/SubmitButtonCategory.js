import React from "react";
import { connect } from "react-redux";
import "./Popup.css";
import { categoryArrayInTimelinePage } from "../redux";
import { AddCategoryPostApi, GetCategoryFetchApi } from "../Api/Timeline";

class SubmitButtonCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "", // used in pop up form for receiving new category from user
    };
  }

  // method - mySubmitHandler - to handle the submit button
  mySubmitHandler = (event) => {
    const { category } = this.state;
    event.preventDefault(); // it prevents the default behaviour
    // object : newCategory - send this object to backend - Its order should be same as categorySchema at the backend
    let newCategory = {
      category,
    };

    // AddCategoryPostApi function
    AddCategoryPostApi(newCategory).then((response) => {
      // Destructure categoryArrayInTimelinePage function, close function
      const { categoryArrayInTimelinePage, close } = this.props;
      if (response.data === false) {
        console.log("category already exists!");
        alert("Category already exists");
      } else {
        console.log("new category added", response.data);
        // GetCategoryFetchApi function

        GetCategoryFetchApi().then((data) => {
          console.log("This is your data", data);
          categoryArrayInTimelinePage(data);
        });
        // calling the close method presents in updateCategoryPopUp
        close();
      }
    });
  };

  // myChangeHandler method - it is setting the state of properties with user entered values
  myChangeHandler = (event) => {
    this.setState({ category: event.target.value });
  };
  // cleanText method - set the text input equals to null on onclick
  cleanText = () => {
    this.setState({ category: "" });
  };

  render() {
    console.log("category initial value : ", this.state.category);

    const { category } = this.state;
    return (
      <div>
        {/* Pop up form starts  */}
        <form onSubmit={this.mySubmitHandler}>
          <div>
            <p className=" text divStyle">
              {" "}
              <br />
              <br />
              <br />
              Enter your category
              <br />
              <br />
              <br />
            </p>
          </div>
          {/* category to be added */}
          <div className="divStyle">
            {" "}
            <input
              type="text"
              onClick={this.cleanText}
              onChange={this.myChangeHandler}
              value={category}
              required
            />
          </div>
          <br />
          <br />
          <br />
          {/* submit button  */}
          <div className="divStyle">
            {" "}
            <input type="submit" />
          </div>
        </form>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state in submitButtoncategory.js", state);
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
)(SubmitButtonCategory);
