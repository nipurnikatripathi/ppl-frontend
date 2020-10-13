import React, { Component } from "react";
import { connect } from "react-redux";
import { uploadPostArrayInTimelinePage } from "../redux";
import Post from "./Post";


class LeftSectionPostTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Destructure uploadPostArray props
    const { uploadPostArray } = this.props;
    console.log("upload post array in left section timeline", uploadPostArray);
    return (
      <div>
        {/* visiting in every index of uploadPostArray using map */}
        {uploadPostArray?.map((uploadPost, index) => {
          return <Post uploadPost={uploadPost} />;
        })}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state in left section post timeline ", state);
  return {
    uploadPostArray: state.timelineReducer.uploadPostArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPostArrayInTimelinePage: (data) =>
      dispatch(uploadPostArrayInTimelinePage(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSectionPostTimeline);
