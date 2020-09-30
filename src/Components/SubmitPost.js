import React from "react";
import Timeline from "./Timeline";
import Axios from "axios"; // importing Axios
import Dropdown from 'react-dropdown';
 import 'react-dropdown/style.css';

// SubmitPost component
class SubmitPost extends React.Component {
  state = {
    image: "",
    imageUploaded: "",
  };

  mySubmitHandler = (event) => {
    event.preventDefault();
    this.setState({ imageUploaded: "uploded" });
    console.log("image uplaoded after submit");
  };
  myChangeHandler = (event) => {
    this.setState({ image: event.target.value });
  };

  render() {
    const options = ["one", "two", "three"];

    console.log("reached submitpost");
    return (
      <div>
        <form onSubmit={this.mySubmitHandler}>
          <div>
            <br />
            <br />
            upload post
            <br />
            <br />
          </div>
          <div className="inputBox">
            <input
              type="text"
              onChange={this.myChangeHandler}
              value={this.state.image}
            />
          </div>
          <br />
          <br />
          <Dropdown
            options={options}
            // onChange={this._onSelect}
            // value={}
            placeholder="Select an option"
          />

          {/* submit button  */}
          <div className="submitButton">
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}
export default SubmitPost;
