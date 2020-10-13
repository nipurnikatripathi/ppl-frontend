import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import RightSectionTimeline from "./RightSectionTimeline";
import { connect } from "react-redux";
import moment from "moment";
import { uploadPostArrayInTimelinePage, singlePost } from "../redux";
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
  SinglePostPostApi,
  AddUsernamePostApi,
} from "../Api/Timeline";

class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: "",
      commentBox: false,
      userArray: [],
      uploadPost: [],
      postId: "",
      isLoggedIn: true,
      userName: "",
    };
  }
  componentDidMount() {
    const userName = localStorage.getItem("user");
    console.log("userName in component did mount single post :", userName);
    const userEmail = {
      userEmail: userName,
    };
    //AddUsernamePostApi function
    AddUsernamePostApi(userEmail)
      .then((response) => {
        console.log("response in AddUsernamePostApi", response);
        this.setState({
          userName: response?.data[0]?.username, // + " " + response.data[0].lastName,
        });

        console.log("username in time line page", response?.data[0]?.username);
      })
      .catch(function (error) {
        console.log("something is wrong inside addusername api in timeline!");
      });

    const singlepostId = { singlepostId: this.props?.location?.query?.postId };
    console.log("singlePostId", singlepostId);
    SinglePostPostApi(singlepostId).then((response) => {
      console.log("response from server in single post api", response[0]);
      this.setState({ uploadPost: response[0] });
    });
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
    console.log("username in handle click in single post ", userEmail, postId);
    const userLikedPost = {
      userEmail,
      postId,
    };

    //LikesPostApi function
    LikesPostApi(userLikedPost).then((response) => {
      console.log("response from server in likes", response.data);
      // Destructure uploadPostArrayInTimelinePage props
      const { uploadPostArrayInTimelinePage } = this.props;
      const singlepostId = { singlepostId: postId };

      //  GetUploadPostFetchApi function
      GetUploadPostFetchApi().then((data) => {
        console.log("data from response in left section", data);
        uploadPostArrayInTimelinePage(data);
      });

      SinglePostPostApi(singlepostId).then((response) => {
        console.log("response from server in single post api @@@@@", response);
        this.setState({ uploadPost: response[0] });
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
      const singlepostId = { singlepostId: postId };

      SinglePostPostApi(singlepostId).then((response) => {
        console.log("response from server in single post api @@@@@", response);
        this.setState({ uploadPost: response[0] });
      });
    });
  };

  render() {
    // const { uploadPost } = this.state;
    const {
      comments,
      commentBox,
      userArray,
      isLoggedIn,
      userName,
      uploadPost,
    } = this.state;

    console.log("single post state", this.state?.uploadPost);
    return (
      // <div>
      //   <Header />
      //   <div className="container">
      //     <div className="content">
      //       <div className="content_lft">
      //         {/* <LeftSectionPostTimeline {...this.props} /> */}
      //         <div className="contnt_2">
      //           <div className="div_a">
      //           </div>
      //         </div>
      //       <RightSectionTimeline {...this.props} />
      //     </div>
      //   </div>
      //   <div className="clear" />
      //   <Footer />

      <div>
        <Header userLoggedIn={isLoggedIn} userName={userName} {...this.props} />
        <div className="container">
          <div className="content">
            {/* <div className="content_lft"> */}

            <div className="contnt_2">
              <div className="div_a">
                <div className="div_title">
                  User Interface PSD Source files Web Designing for web
                </div>
                <div className="btm_rgt">
                  {/* category name */}
                  <div className="btm_arc">
                    {uploadPost?.category?.categoryName}
                  </div>
                </div>
                <div className="div_top">
                  <div className="div_top_lft">
                    <img src="images/img_6.png" />
                    {/* user fullname */}
                    {uploadPost?.userid?.firstName}{" "}
                    {uploadPost?.userid?.lastName}
                  </div>
                  <div className="div_top_rgt">
                    <span className="span_date">
                      {/* post date and time */}
                      {moment(uploadPost?.currentdate).format(
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
                <div className="div_image">
                  <img
                    src={"http://localhost:8081/" + uploadPost?.filename}
                    alt="peto"
                  />
                </div>

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
                            {uploadPost?.likes?.length ? (
                              // thumpsUp for likes
                              <a
                                onClick={() =>
                                  this.handleLikes(uploadPost?._id)
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faThumbsUp}
                                  color="white"
                                />
                              </a>
                            ) : (
                              //  thumpsDown for Dislikes
                              <a
                                onClick={() =>
                                  this.handleLikes(uploadPost?._id)
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faThumbsDown}
                                  color="white"
                                />
                              </a>
                            )}
                          </span>
                          {/* total no of likes */}
                          {uploadPost?.likes?.length}
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
                          {uploadPost?.comments?.length}
                        </a>
                      </li>
                    </ul>

                    {/* {uploadPost?.comments?.length ? (
                // if comments greater than zero that is true
                <div>
                  <div className=" rght_cate_hd display_last_comment">
                    <div>
                      {userArray?.map((user, index) => {
                        console.log("userArray.user", user.email);
                        if (
                          user.email ===
                          uploadPost.comments[uploadPost.comments.length - 1]
                            .userEmail
                        )
                          // show username who posted comment
                          return <p>{user.username}</p>;
                      })}
                    </div>
                    {/* show comment posted by user 
                    <p className="comment">
                      {
                        uploadPost?.comments[uploadPost.comments.length - 1]
                          .comments
                      }
                    </p>
                  </div>
                  <ul className="ulStyle divStyleComment">
                    <li>
                      {/* display comment button to add more comments 
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
              ) :  comments length is zero display nothing

              null} */}
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
              {uploadPost?.comments?.map((comment, index) => {
                console.log("comment map", comment.userEmail);
                return (
                  <div className="contnt_3">
                    <ul>
                      <li>
                        <div className="list_image">
                          <div className="image_sec">
                            <img src="images/post_img.png" />
                          </div>
                          <div className="image_name">
                            {" "}
                            {userArray?.map((user, index) => {
                              console.log("userArray.user", user.email);
                              if (user.email === comment.userEmail)
                                //   // show username who posted comment
                                return <p>{user.username}</p>;
                            })}
                          </div>
                        </div>
                        <div className="list_info">{comment?.comments}</div>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="clear" />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state in left section post timeline ", state);
  return {
    uploadPostArray: state.timelineReducer.uploadPostArray,
    //singlePostArray: state.timelineReducer.singlePostArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPostArrayInTimelinePage: (data) =>
      dispatch(uploadPostArrayInTimelinePage(data)),
    // singlePost: (data) => dispatch(singlePost(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);

//export default SinglePost;

{
  /* 
<meta charSet="utf-8" />
<title>Singal Post</title>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
<link
  href="css/bootstrap-responsive.css"
  rel="stylesheet"
  type="text/css"
/>

   <div className="navbar navbar-inverse navbar-fixed-top">
      <div className="navbar-inner">
        <div className="container">
          <button
            type="button"
            className="btn btn-navbar"
            data-toggle="collapse"
            data-target=".nav-collapse"
          >
            {" "}
            <span className="icon-bar" /> <span className="icon-bar" />{" "}
            <span className="icon-bar" />{" "}
          </button>
          <a className="brand" href>
            PPL
          </a>
          <div className="pro_info pull-right">
            <div className="pro_icn">
              <img src="images/pic_small.png" />
            </div>
            <div className="pro_txt">
              Me
              <b className="caret" />
            </div>
            <ul
              className="dropdown-menu"
              role="menu"
              aria-labelledby="dLabel"
            >
              <li>
                <a tabIndex={-1} href="#">
                  My Profile
                </a>
              </li>
              <li>
                <a tabIndex={-1} href="#">
                  Message Box
                </a>
              </li>
              <li>
                <a tabIndex={-1} href="#">
                  Change Language
                </a>
              </li>
              <li className="divider" />
              <li>
                <a tabIndex={-1} href="#">
                  <input type="text" placeholder="search" />
                </a>
              </li>
            </ul>
          </div>
          <div className="nav-collapse collapse">
            <ul className="nav">
              <li className="active">
                {" "}
                <a href>Home</a>{" "}
              </li>
              <li className>
                {" "}
                <a href>E-Coupons</a>{" "}
              </li>
              <li className>
                {" "}
                <a href>E-Brands</a>{" "}
              </li>
              <li className>
                {" "}
                <a href>Resuse Market</a>{" "}
              </li>
              <li className>
                {" "}
                <a href>Lost and Found</a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div> */
}
{
  /* <div className="header">
      <div className="header_lft">
        <div className="logo">
          <a href="#">
            <img src="images/logo.png" />
          </a>
        </div>
        <div className="navigatn">
          <ul>
            <li>
              <a href="#" className="active">
                Home
              </a>
            </li>
            <li>
              <a href="#"> E-Coupons </a>
            </li>
            <li>
              <a href="#">E-Brands </a>
            </li>
            <li>
              <a href="#"> Resuse Market </a>
            </li>
            <li>
              <a href="#"> Lost and Found</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="header_rgt">
        <div className="flag_div">
          <img src="images/flag.png" />
        </div>
        <input type="text" placeholder="Search" className="txt_box" />
        <div className="msg_box">
          <a href="#">
            <span className="msg_count">100</span>
          </a>
        </div>
        <div className="info_div">
          <div className="image_div">
            {" "}
            <img src="images/pic.png" />{" "}
          </div>
          <div className="info_div1">Me</div>
        </div>
      </div>
    </div> */
}
{
  /* <div className="container">
      <div className="content">
        <div className="content_rgt">
          <div className="rght_btn">
            {" "}
            <span className="rght_btn_icon">
              <img src="images/btn_iconb.png" alt="up" />
            </span>{" "}
            <span className="btn_sep">
              <img src="images/btn_sep.png" alt="sep" />
            </span>{" "}
            <a href="#">Upload Post</a>{" "}
          </div>
          <div className="rght_btn">
            {" "}
            <span className="rght_btn_icon">
              <img src="images/btn_icona.png" alt="up" />
            </span>{" "}
            <span className="btn_sep">
              <img src="images/btn_sep.png" alt="sep" />
            </span>{" "}
            <a href="#">Invite Friends</a>{" "}
          </div>
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
                    Others
                  </a>
                </li>
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
        <div className="content_lft">
          <div className="contnt_2">
            <div className="div_a">
              <div className="div_title">
                User Interface PSD Source files Web Designing for web
              </div>
              <div className="btm_rgt">
                <div className="btm_arc">Cats</div>
              </div>
              <div className="div_top">
                <div className="div_top_lft">
                  <img src="images/img_6.png" />
                  Steave Waugh
                </div>
                <div className="div_top_rgt">
                  <span className="span_date">02 Jan 2014</span>
                  <span className="span_time">11:15am</span>
                </div>
              </div>
              <div className="div_image">
                <img src="images/lft_img.png" alt="pet" />
              </div>
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
                          <img src="images/icon_003.png" alt="share" />
                        </span>
                        0 Likes
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="btn_icon">
                          <img src="images/icon_004.png" alt="share" />
                        </span>
                        4 Comments
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="contnt_3">
            <ul>
              <li>
                <div className="list_image">
                  <div className="image_sec">
                    <img src="images/post_img.png" />
                  </div>
                  <div className="image_name">Bharat</div>
                </div>
                <div className="list_info">
                  This is an example of a comment. You can create as many
                  comments like this one or sub comments as you like and
                  manage all of your content inside your Account.
                </div>
                <input
                  type="button"
                  defaultValue="Reply"
                  className="orng_btn"
                />
              </li>
              <li>
                <div className="list_image">
                  <div className="image_sec">
                    <img src="images/post_img.png" />
                  </div>
                  <div className="image_name">Bharat</div>
                </div>
                <div className="list_info">
                  This is an example of a comment. You can create as many
                  comments like this one or sub comments as you like and
                  manage all of your content inside your Account.
                </div>
                <input
                  type="button"
                  defaultValue="Reply"
                  className="black_btn"
                />
                <div className="cmnt_div">
                  <input
                    type="text"
                    defaultValue="Add a Comment"
                    className="cmnt_bx"
                  />
                  <input
                    type="submit"
                    className="sub_bttn"
                    defaultValue="Submit Comment"
                  />
                </div>
              </li>
              <li>
                <div className="list_image">
                  <div className="image_sec">
                    <img src="images/post_img.png" />
                  </div>
                  <div className="image_name">Bharat</div>
                </div>
                <div className="list_info">
                  This is an example of a comment. You can create as many
                  comments like this one or sub comments as you like and
                  manage all of your content inside your Account.
                </div>
                <input
                  type="button"
                  defaultValue="Reply"
                  className="orng_btn"
                />
              </li>
              <li>
                <div className="cmnt_div1">
                  <input
                    type="text"
                    defaultValue="Enter your Comment"
                    className="cmnt_bx1"
                  />
                  <input
                    type="submit"
                    className="sub_bttn1"
                    defaultValue="Submit Comment"
                  />
                </div>
              </li>
            </ul>
            <div className="view_div">
              <a href="#">View more</a>
            </div>
          </div>
        </div>
      </div>
      <div className="clear" />
    </div> */
}
{
  /* <div className="footr">
      <div className="footr_lft">
        <div className="footer_div1">
          Copyright © Pet-Socail 2014 All Rights Reserved
        </div>
        <div className="footer_div2">
          <a href="#">Privacy Policy </a>|{" "}
          <a href="#"> Terms &amp; Conditions</a>
        </div>
      </div>
      <div className="footr_rgt">
        <ul>
          <li>
            <a href="#">
              <img src="images/social_1.png" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="images/social_2.png" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="images/social_3.png" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="images/social_4.png" />
            </a>
          </li>
        </ul>
      </div>
    </div> */
}
