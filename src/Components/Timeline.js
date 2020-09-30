import React from "react";
import Register from "./Register";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Modal from "./UpdateCategoryPopUp";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import UploadPostModal from "./UploadPost";

// Timeline component
class Timeline extends React.Component {
  // state of Timeline component
  state = {
    modal: false,
    newCategory: "",
    categoryArray: [],
    username: "",
    userEmail: "",
    postModal: false,
  };
  postSelectModal = (info) => {
    console.log("before - postModal:", this.state.postModal);
    this.setState({ postModal: !this.state.postModal }); // true/false toggle
    console.log("After - postModal:", this.state.postModal);
  };
  selectModal = (info) => {
    this.setState({ modal: !this.state.modal }); // true/false toggle
  };
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

    //fetch(`http://localhost:8081/getCategory`)
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log("This is your category in timeline", data);
    //   console.log("id , category", id, category);

    //   if(data[0].categoryName === category)
    //     console.log("data deleted");
    // });
  };

  // method - handleLogout - to handle the logout button
  handleLogout = (e) => {
    e.preventDefault(); // prevents default behaviour
    console.log("handle logout function");
    alert("Do you want to LOGOUT ?");
    localStorage.clear(); // clear the local storage
    this.props.history.push("/login"); // forcefully redirect to login page
  };
  componentDidMount() {
    fetch(`http://localhost:8081/getCategory`)
      .then((response) => response.json())
      .then((data) => {
        console.log("This is your data", data);

        this.setState({ categoryArray: data });
      });
    // console.log("categoryArray: ", this.state.categoryArray);

    let userName = localStorage.getItem("user");
    console.log("userName in component did mount :", userName);

    // post call at addusername API
    Axios.post(`http://localhost:8081/addusername`, { userEmail: userName }) // send user object to backend
      .then((response) => {
        this.setState({
          username: response.data[0].username + " " + response.data[0].lastName,
          userEmail: response.data[0].email,
        });

        console.log(
          "inside addusername api in timeline",
          response.data[0].username
        );
      }) // if no response received
      .catch(function (error) {
        console.log("something is wrong inside addusername api in timeline!");
      });
  }

  // fetch(`http://localhost:8081/getUsername`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("username response from fetch ", data);

  // console.log("This is your data", data);

  // this.props.categoryUpdateFunction(data);

  //      addInput = ev => {
  //     this.setState(prev => ({ inputs: [...prev.inputs, 'Hi'] }))
  // }

  render() {
    console.log("state from register: ", this.props);
    console.log("categoryArray: ", this.state.categoryArray);
    const logoStyle = {
      color: "white",
      float: "right",
      marginRight: "-200%",
      marginTop: "-70%",

      // display : "flex",
      // alignContent : "center"
    };
    const usernameStyle = {
      color: "black",
      // backgroundColor: "white",
      marginRight: "-100%",
      marginTop: "-10%",
      // fontSize : "2vh"
    };

    const deleteCategory = {
      marginRight: "-1%",
      float: "right",
    };
    const bodyStyle = {
      overflowY: "hidden",
    };
    console.log(this.state.modal);
    return (
      <div>
        {this.state.modal ? <Modal
          displayModal={this.state.modal}
          closeModal={this.selectModal}
          categoryUpdateFunction={this.categoryUpdateFunction}
        /> :
        <div style={this.state.modal ? bodyStyle : {}}>
          <meta charSet="utf-8" />
          <title>Home</title>
          <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
          <link
            href="css/bootstrap-responsive.css"
            rel="stylesheet"
            type="text/css"
          />
          <div className="header">
            <div className="header_rgt">
              <div className="info_div">
                <div className="info_div1">
                  <div>
                    <h6 style={usernameStyle}>{this.state.username}</h6>
                    {/* Logout button */}
                    <a style={logoStyle} onClick={this.handleLogout}>
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        size="lg"
                        color="white"
                      />
                    </a>
                  </div>
  
                  {/* <button onClick={this.handleLogout}>Logout</button> */}
                  {/* <Link to="/login" target="_self">
                      Logout!
                    </Link> */}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
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
                  {/* Upload Post link */}
                  <div>
                    <a onClick={this.postSelectModal}>Upload Post</a>
                    <UploadPostModal
                      displayModal={this.state.postModal}
                      closeModal={this.postSelectModal}
                    />
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
                    <div className="  .my-body-noscroll-class">
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
              <div className="content_lft">
                <div className="contnt_1">
                  <div className="list_1">
                    <ul>
                      <li>
                        <input type="checkbox" className="chk_bx" />
                        Friends
                      </li>
                      <li>
                        <input type="checkbox" className="chk_bx" />
                        Flaged
                      </li>
                    </ul>
                  </div>
                  <div className="timeline_div">
                    <div className="timeline_div1">
                      <div className="profile_pic">
                        <img src="images/timeline_img1.png" />
                        <div className="profile_text">
                          <a href="#">Change Profile Pic</a>
                        </div>
                      </div>
                      <div className="profile_info">
                        <div className="edit_div">
                          <a href="#">
                            Edit <img src="images/timeline_img.png" />
                          </a>
                        </div>
                        <div className="profile_form">
                          <ul>
                            <li>
                              <div className="div_name1">
                                Name :<h5>{this.state.username}</h5>
                              </div>
                              {/* <div className="div_name2">
                                {/* {this.props.sendData.username} 
                              </div> */}
                            </li>
                            <li>
                              <div className="div_name1">
                                Email : <h6>{this.state.userEmail}</h6>
                              </div>
  
                              {/* <div className="div_name2">Female</div> */}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="timeline_div2">
                      <ul>
                        <li>
                          <a href="#" className="active">
                            Timeline{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#">About </a>
                        </li>
                        <li>
                          <a href="#">Album</a>
                        </li>
                        <li>
                          <a href="#"> Pets</a>
                        </li>
                        <li>
                          <a href="#">My Uploads </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
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
                <div className="contnt_2">
                  <div className="div_a">
                    <div className="div_title">
                      User Interface PSD Source files Web Designing for web
                    </div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
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
                      <img src="images/lft_img1.png" alt="pet" />
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
              </div>
            </div>
            <div className="clear" />
          </div>
        </div>
        }
      </div>
    );
  }
}
export default Timeline;











































//   render() {
//     console.log("state from register: ", this.props);
//     console.log("categoryArray: ", this.state.categoryArray);
//     const logoStyle = {
//       color: "white",
//       float: "right",
//       marginRight: "-200%",
//       marginTop: "-70%",

//       // display : "flex",
//       // alignContent : "center"
//     };
//     const usernameStyle = {
//       color: "black",
//       // backgroundColor: "white",
//       marginRight: "-100%",
//       marginTop: "-10%",
//       // fontSize : "2vh"
//     };

//     const deleteCategory = {
//       marginRight: "-1%",
//       float: "right",
//     };
//     const bodyStyle = {
//       overflowY: "hidden",
//     };
//     console.log(this.state.modal);
//     return (
//       <div>
//         {this.state.modal ? <Modal
//           displayModal={this.state.modal}
//           closeModal={this.selectModal}
//           categoryUpdateFunction={this.categoryUpdateFunction}
//         /> :
//         <div style={this.state.modal ? bodyStyle : {}}>
//           <meta charSet="utf-8" />
//           <title>Home</title>
//           <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
//           <link
//             href="css/bootstrap-responsive.css"
//             rel="stylesheet"
//             type="text/css"
//           />
//           <div className="navbar navbar-inverse navbar-fixed-top">
//             <div className="navbar-inner">
//               <div className="container">
//                 <button
//                   type="button"
//                   className="btn btn-navbar"
//                   data-toggle="collapse"
//                   data-target=".nav-collapse"
//                 >
//                   {" "}
//                   <span className="icon-bar" /> <span className="icon-bar" />{" "}
//                   <span className="icon-bar" />{" "}
//                 </button>
//                 <a className="brand" href>
//                   PPL
//                 </a>
//                 <div className="pro_info pull-right">
//                   <div className="pro_icn">
//                     <img src="images/pic_small.png" />
//                   </div>
//                   <div className="pro_txt">
//                     Me
//                     <b className="caret" />
//                   </div>
//                   <ul
//                     className="dropdown-menu"
//                     role="menu"
//                     aria-labelledby="dLabel"
//                   >
//                     <li>
//                       <a tabIndex={-1} href="#">
//                         My Profile
//                       </a>
//                     </li>
//                     <li>
//                       <a tabIndex={-1} href="#">
//                         Message Box
//                       </a>
//                     </li>
//                     <li>
//                       <a tabIndex={-1} href="#">
//                         Change Language
//                       </a>
//                     </li>
//                     <li className="divider" />
//                     <li>
//                       <a tabIndex={-1} href="#">
//                         <input type="text" placeholder="search" />
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="nav-collapse collapse">
//                   <ul className="nav">
//                     <li className="active">
//                       {" "}
//                       <a href>Home</a>{" "}
//                     </li>
//                     <li className>
//                       {" "}
//                       <a href>E-Coupons</a>{" "}
//                     </li>
//                     <li className>
//                       {" "}
//                       <a href>E-Brands</a>{" "}
//                     </li>
//                     <li className>
//                       {" "}
//                       <a href>Resuse Market</a>{" "}
//                     </li>
//                     <li className>
//                       {" "}
//                       <a href>Lost and Found</a>{" "}
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="header">
//             <div className="header_lft">
//               <div className="logo">
//                 <a href="#">
//                   <img src="images/logo.png" />
//                 </a>
//               </div>
//               <div className="navigatn">
//                 <ul>
//                   <li>
//                     <a href="#" className="active">
//                       Home
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#"> E-Coupons </a>
//                   </li>
//                   <li>
//                     <a href="#">E-Brands </a>
//                   </li>
//                   <li>
//                     <a href="#"> Resuse Market </a>
//                   </li>
//                   <li>
//                     <a href="#"> Lost and Found</a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="header_rgt">
//               <div className="flag_div">
//                 <img src="images/flag.png" />
//               </div>
//               <input type="text" placeholder="Search" className="txt_box" />
//               <div className="msg_box">
//                 <a href="#">
//                   <span className="msg_count">100</span>
//                 </a>
//               </div>
//               <div className="info_div">
//                 <div className="image_div">
//                   {" "}
//                   <img src="images/pic.png" />{" "}
//                 </div>
//                 <div className="info_div1">
//                   <div>
//                     {/* <div className="btn" onClick={this.togglePop}>
//                         <button>New User?</button>
//                       </div>
//                       {this.state.seen ? <PopUp toggle={this.togglePop} /> : null} */}
//                   </div>
//                   <div>
//                     {/* <div>
//                       <h6 style={usernameStyle}>{this.state.username}</h6>
//                     </div> */}
  
//                     <h6 style={usernameStyle}>{this.state.username}</h6>
//                     {/* Logout button */}
//                     <a style={logoStyle} onClick={this.handleLogout}>
//                       <FontAwesomeIcon
//                         icon={faSignOutAlt}
//                         size="lg"
//                         color="white"
//                       />
//                     </a>
//                   </div>
  
//                   {/* <button onClick={this.handleLogout}>Logout</button> */}
//                   {/* <Link to="/login" target="_self">
//                       Logout!
//                     </Link> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="container">
//             <div className="content">
//               <div className="content_rgt">
//                 <div className="rght_btn">
//                   {" "}
//                   <span className="rght_btn_icon">
//                     <img src="images/btn_iconb.png" alt="up" />
//                   </span>{" "}
//                   <span className="btn_sep">
//                     <img src="images/btn_sep.png" alt="sep" />
//                   </span>{" "}
//                   {/* Upload Post link */}
//                   <div>
//                     <a onClick={this.postSelectModal}>Upload Post</a>
//                     <UploadPostModal
//                       displayModal={this.state.postModal}
//                       closeModal={this.postSelectModal}
//                     />
//                   </div>
//                   {/* <a href="#">Upload Post</a>{" "} */}
//                 </div>
//                 <div className="rght_btn">
//                   {" "}
//                   <span className="rght_btn_icon">
//                     <img src="images/btn_icona.png" alt="up" />
//                   </span>{" "}
//                   <span className="btn_sep">
//                     <img src="images/btn_sep.png" alt="sep" />
//                   </span>{" "}
//                   {/* Add category link */}
//                   <div>
//                     <div className="  .my-body-noscroll-class">
//                       <a onClick={this.selectModal}>Add Category</a>
                      
//                     </div>
//                   </div>
//                   {/* <a onClick={this.updateCategory}>Update Category </a>{" "} */}
//                   {/* <a href="#" onClick={this.updateCategory}>
//                     Update Category
//                   </a>{" "} */}
//                 </div>
//                 <div className="rght_cate">
//                   <div className="rght_cate_hd" id="rght_cat_bg">
//                     Categories
//                   </div>
//                   <div className="rght_list">
//                     <ul>
//                       <div>
//                         {this.state.categoryArray.map((category, index) => (
//                           <p key={index}>
//                             <li>
//                               <a href="#">
//                                 <span className="list_icon">
//                                   <img src="images/icon_05.png" alt="up" />
//                                 </span>{" "}
//                                 {category.categoryName} !{"     "}
//                                 <div style={deleteCategory}>
//                                   <button
//                                     onClick={() =>
//                                       this.handleDeleteCategory(index, category)
//                                     }
//                                   >
//                                     Delete
//                                   </button>
//                                 </div>
//                               </a>
//                             </li>
//                           </p>
//                         ))}
//                       </div>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="rght_cate">
//                   <div className="rght_cate_hd" id="opn_cat_bg">
//                     Featured
//                   </div>
//                   <div className="sub_dwn">
//                     <div className="feat_sec">
//                       <div className="feat_sec_img">
//                         <img src="images/feat_img1.png" alt="image" />
//                       </div>
//                       <div className="feat_txt">Lorem Ipusum Text</div>
//                     </div>
//                     <div className="feat_sec">
//                       <div className="feat_sec_img">
//                         <img src="images/feat_img2.png" alt="image" />
//                       </div>
//                       <div className="feat_txt">Lorem Ipusum Text</div>
//                       <div className="btm_rgt">
//                         <div className="btm_arc">Dogs</div>
//                       </div>
//                     </div>
//                     <div className="feat_sec">
//                       <div className="feat_sec_img">
//                         <img src="images/feat_img3.png" alt="image" />
//                       </div>
//                       <div className="feat_txt">Lorem Ipusum Text</div>
//                       <div className="btm_rgt">
//                         <div className="btm_arc">Rabbits</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="content_lft">
//                 <div className="contnt_1">
//                   <div className="list_1">
//                     <ul>
//                       <li>
//                         <input type="checkbox" className="chk_bx" />
//                         Friends
//                       </li>
//                       <li>
//                         <input type="checkbox" className="chk_bx" />
//                         Flaged
//                       </li>
//                     </ul>
//                   </div>
//                   <div className="timeline_div">
//                     <div className="timeline_div1">
//                       <div className="profile_pic">
//                         <img src="images/timeline_img1.png" />
//                         <div className="profile_text">
//                           <a href="#">Change Profile Pic</a>
//                         </div>
//                       </div>
//                       <div className="profile_info">
//                         <div className="edit_div">
//                           <a href="#">
//                             Edit <img src="images/timeline_img.png" />
//                           </a>
//                         </div>
//                         <div className="profile_form">
//                           <ul>
//                             <li>
//                               <div className="div_name1">
//                                 Name :<h5>{this.state.username}</h5>
//                               </div>
//                               {/* <div className="div_name2">
//                                 {/* {this.props.sendData.username} 
//                               </div> */}
//                             </li>
//                             <li>
//                               <div className="div_name1">
//                                 Email : <h6>{this.state.userEmail}</h6>
//                               </div>
  
//                               {/* <div className="div_name2">Female</div> */}
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="timeline_div2">
//                       <ul>
//                         <li>
//                           <a href="#" className="active">
//                             Timeline{" "}
//                           </a>
//                         </li>
//                         <li>
//                           <a href="#">About </a>
//                         </li>
//                         <li>
//                           <a href="#">Album</a>
//                         </li>
//                         <li>
//                           <a href="#"> Pets</a>
//                         </li>
//                         <li>
//                           <a href="#">My Uploads </a>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="contnt_2">
//                   <div className="div_a">
//                     <div className="div_title">
//                       User Interface PSD Source files Web Designing for web
//                     </div>
//                     <div className="btm_rgt">
//                       <div className="btm_arc">Cats</div>
//                     </div>
//                     <div className="div_top">
//                       <div className="div_top_lft">
//                         <img src="images/img_6.png" />
//                         Steave Waugh
//                       </div>
//                       <div className="div_top_rgt">
//                         <span className="span_date">02 Jan 2014</span>
//                         <span className="span_time">11:15am</span>
//                       </div>
//                     </div>
//                     <div className="div_image">
//                       <img src="images/lft_img.png" alt="pet" />
//                     </div>
//                     <div className="div_btm">
//                       <div className="btm_list">
//                         <ul>
//                           <li>
//                             <a href="#">
//                               <span className="btn_icon">
//                                 <img src="images/icon_001.png" alt="share" />
//                               </span>
//                               Share
//                             </a>
//                           </li>
//                           <li>
//                             <a href="#">
//                               <span className="btn_icon">
//                                 <img src="images/icon_002.png" alt="share" />
//                               </span>
//                               Flag
//                             </a>
//                           </li>
//                           <li>
//                             <a href="#">
//                               <span className="btn_icon">
//                                 <img src="images/icon_003.png" alt="share" />
//                               </span>
//                               0 Likes
//                             </a>
//                           </li>
//                           <li>
//                             <a href="#">
//                               <span className="btn_icon">
//                                 <img src="images/icon_004.png" alt="share" />
//                               </span>
//                               4 Comments
//                             </a>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="contnt_2">
//                   <div className="div_a">
//                     <div className="div_title">
//                       User Interface PSD Source files Web Designing for web
//                     </div>
//                     <div className="btm_rgt">
//                       <div className="btm_arc">Dogs</div>
//                     </div>
//                     <div className="div_top">
//                       <div className="div_top_lft">
//                         <img src="images/img_6.png" />
//                         Steave Waugh
//                       </div>
//                       <div className="div_top_rgt">
//                         <span className="span_date">02 Jan 2014</span>
//                         <span className="span_time">11:15am</span>
//                       </div>
//                     </div>
//                     <div className="div_image">
//                       <img src="images/lft_img1.png" alt="pet" />
//                     </div>
//                     <div className="div_btm">
//                       <div className="btm_list">
//                         <ul>
//                           <li>
//                             <a href="#">
//                               <span className="btn_icon">
//                                 <img src="images/icon_001.png" alt="share" />
//                               </span>
//                               Share
//                             </a>
//                           </li>
//                           <li>
//                             <a href="#">
//                               <span className="btn_icon">
//                                 <img src="images/icon_002.png" alt="share" />
//                               </span>
//                               Flag
//                             </a>
//                           </li>
//                           <li>
//                             <a href="#">
//                               <span className="btn_icon">
//                                 <img src="images/icon_003.png" alt="share" />
//                               </span>
//                               0 Likes
//                             </a>
//                           </li>
//                           <li>
//                             <a href="#">
//                               <span className="btn_icon">
//                                 <img src="images/icon_004.png" alt="share" />
//                               </span>
//                               4 Comments
//                             </a>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="clear" />
//           </div>
//           <div className="footr">
//             <div className="footr_lft">
//               <div className="footer_div1">
//                 Copyright © Pet-Socail 2014 All Rights Reserved
//               </div>
//               <div className="footer_div2">
//                 <a href="#">Privacy Policy </a>|{" "}
//                 <a href="#"> Terms &amp; Conditions</a>
//               </div>
//             </div>
//             <div className="footr_rgt">
//               <ul>
//                 <li>
//                   <a href="#">
//                     <img src="images/social_1.png" />
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#">
//                     <img src="images/social_2.png" />
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#">
//                     <img src="images/social_3.png" />
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#">
//                     <img src="images/social_4.png" />
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         }
//       </div>
//     );
//   }
// }
// export default Timeline;
