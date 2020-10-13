import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { uploadPostArrayInTimelinePage } from "../redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsDown,
  faThumbsUp,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import {
  GetUploadPostFetchApi,
  LikesPostApi,
  CommentsPostApi,
  GetUsernameFetchApi,
} from "../Api/Timeline";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: "",
      commentBox: false,
      userArray: [],
      isLoggedIn: true,
      userName: "",
    };
  }
  componentDidMount() {
    // fetching userArray to display who posted the comment
    GetUsernameFetchApi().then((response) => {
      console.log(
        "This is your user array from get call in  post.js",
        response
      );
      this.setState({ userArray: response });
    });
  }

  // toggle the comment form display
  handleToggleCommentBox = () => {
    const { commentBox } = this.state;
    this.setState({ commentBox: !commentBox });
  };

  // comments input by user
  handleChange = (event) => {
    this.setState({ comments: event.target.value });
    console.log("comments in handle change", this.state.comments);
  };

  // for likes in upload post
  handleLikes = (postId) => {
    const userEmail = localStorage.getItem("user");
    console.log("username in handle click", userEmail, postId);
    const userLikedPost = {
      userEmail,
      postId,
    };

    //LikesPostApi function
    LikesPostApi(userLikedPost).then((response) => {
      console.log("response from server in likes", response.data);
      // Destructure uploadPostArrayInTimelinePage props
      const { uploadPostArrayInTimelinePage } = this.props;
      //  GetUploadPostFetchApi function
      GetUploadPostFetchApi().then((data) => {
        console.log("data from response in left section", data);
        uploadPostArrayInTimelinePage(data);
      });
    });
  };

  // for comments in upload post
  handleComments = (postId) => (event) => {
    event.preventDefault();
    // Destructure comments, commentBox state
    const { comments, commentBox } = this.state;
    const userEmail = localStorage.getItem("user");
    // changing the state of commentBox to toggle between display and hide of comment form
    this.setState({ commentBox: !commentBox });

    console.log("username in handle comments", userEmail, comments, postId);
    const userCommentedPost = {
      userEmail,
      postId,
      comments,
    };
    console.log("userCommentedPost in post.js ", userCommentedPost);

    // CommentsPostApi function
    CommentsPostApi(userCommentedPost).then((response) => {
      console.log("response from server in comments", response.data);
      //Destructure uploadPostArrayInTimelinePage props
      const { uploadPostArrayInTimelinePage } = this.props;
      // GetUploadPostFetchApi function
      GetUploadPostFetchApi().then((data) => {
        console.log("comment data from response in post.js", data);
        uploadPostArrayInTimelinePage(data);
      });
    });
  };

  render() {
    // Destructure uploadPost props
    const { uploadPost } = this.props;
    console.log("upload post in post .js", uploadPost);
    // Destructure comments, commentBox, userArray state
    const { comments, commentBox, userArray } = this.state;
    const postUrl = "singlePost";
    const postId = uploadPost._id;

    return (
      <div className="contnt_2">
        <div className="div_a">
          <div className="div_title">
            User Interface PSD Source files Web Designing for web
          </div>
          <div className="btm_rgt">
            {/* category name */}
            <div className="btm_arc">{uploadPost?.category?.categoryName}</div>
          </div>
          <div className="div_top">
            <div className="div_top_lft">
              <img src="images/img_6.png" />
              {/* user fullname */}
              {uploadPost?.userid?.firstName} {uploadPost?.userid?.lastName}
            </div>
            <div className="div_top_rgt">
              <span className="span_date">
                {/* post date and time */}
                {moment(uploadPost.currentdate).format(
                  "DD MMM YYYY, hh : mm A"
                )}{" "}
              </span>
              <span className="span_time"></span>
            </div>
          </div>
          <div>
            {/* description */}
            <h1> {uploadPost?.description}</h1>
          </div>

          <Link to={{ pathname: `/${postUrl}`, query: { postId } }}>
            <div className="div_image">
              <img
                src={"http://localhost:8081/" + uploadPost.filename}
                alt="peto"
              />
            </div>
          </Link>

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
                      {uploadPost.likes.length ? (
                        // thumpsUp for likes
                        <a onClick={() => this.handleLikes(uploadPost?._id)}>
                          <FontAwesomeIcon icon={faThumbsUp} color="white" />
                        </a>
                      ) : (
                        // thumpsDown for Dislikes
                        <a onClick={() => this.handleLikes(uploadPost?._id)}>
                          <FontAwesomeIcon icon={faThumbsDown} color="white" />
                        </a>
                      )}
                    </span>
                    {/* total no of likes */}
                    {uploadPost?.likes.length}
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="btn_icon">
                      {/* comments */}
                      <a>
                        <FontAwesomeIcon
                          icon={faComment}
                          onClick={this.handleToggleCommentBox}
                          color="white"
                        />
                      </a>
                    </span>
                    {/* total no of comments */}
                    {uploadPost?.comments.length}
                  </a>
                </li>
              </ul>

              {uploadPost?.comments.length ? (
                // if comments greater than zero that is true
                <div>
                  <div className=" rght_cate_hd display_last_comment">
                    <div>
                      {userArray?.map((user, index) => {
                        // console.log("userArray.user", user.email);
                        if (
                          user.email ===
                          uploadPost.comments[uploadPost.comments.length - 1]
                            .userEmail
                        )
                          // show username who posted comment
                          return <p>{user.username}</p>;
                      })}
                    </div>
                    {/* show comment posted by user */}
                    <p className="comment">
                      {
                        uploadPost?.comments[uploadPost.comments.length - 1]
                          .comments
                      }
                    </p>
                  </div>
                  <ul className="ulStyle divStyleComment">
                    <li>
                      {/* display comment button to add more comments */}
                      <a
                        className="add_comments"
                        // opens form to add more comment
                        onClick={this.handleToggleCommentBox}
                      >
                        {" "}
                        Add Comments
                      </a>
                    </li>
                  </ul>
                </div>
              ) : // comments length is zero display nothing

              null}
              {/* commentBox value = true  then displays form to add more comment */}
              {commentBox ? (
                <div>
                  <form onSubmit={this.handleComments(uploadPost._id)}>
                    <textarea
                      className="textarea"
                      name="comments"
                      type="text"
                      onChange={this.handleChange}
                      value={comments}
                      placeholder="Post your comments here"
                    />
                    <div className="divStyleComment">
                      {" "}
                      <input type="submit" />
                    </div>
                  </form>
                </div>
              ) : // commentBox value = false  then hides form

              null}
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);
