import React from "react";
import Timeline from "./Timeline";
import Axios from "axios"; // importing Axios

// SubmitButtonCategory component
class SubmitButtonCategory extends React.Component {
  constructor(props) {
    super(props);
    // state of SubmitButtonCategory component
    this.state = {
      // newCat : "",
      category: "", // used in pop up form for receiving new category from user
      categoryExists: "", // to check the status of category - existing category OR new category
      categoryArray: []
    };
    // binding 'this' to methods - class having constructor
    this.mySubmitHandler = this.mySubmitHandler.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }
    componentDidMount() {
      fetch(`http://localhost:8081/getCategory`)
        .then((response) => response.json())
        .then((data) => {
          console.log("This is your data", data);

          this.setState({ categoryArray: data });
        });
      console.log("category: ", this.state.categoryArray);
    }

  // method - mySubmitHandler - to handle the submit button
  mySubmitHandler = (event) => {
    event.preventDefault(); // it prevents the default behaviour
    // object : newCategory - send this object to backend - Its order should be same as categorySchema at the backend
    let newCategory = {
      category: this.state.category,
    };

    // post call at addCategory API
    Axios.post(`http://localhost:8081/addCategory`, newCategory) // send object - newCtaegory at backend
      .then((response) => {
        // condition : if response received
        if (response.data === false) {
          // condition : if data in received response is equal to false
          console.log("category already exists!");
          this.setState({
            categoryExists: "Category already exists",
          });
        } else {
          // condition : if data in received response is equal to true
          console.log("new category added", response.data);
          // fetching the new category from backend via getCategory API
          fetch(`http://localhost:8081/getCategory`)
            .then((response) => response.json())
            .then((data) => {
              // if data arrived from backend after fetching
              console.log("This is your data", data);
              // calling the categoryUpdateFunction method presents in timeline component and passing argument data (new cattegory)
              this.props.categoryUpdateFunction(data);
            });
          console.log("props", this.props);
          console.log("state", this.state);
          // calling the close method presents in updateCategoryPopUp
          this.props.close();
          this.setState({
            categoryExists: "",
          });

        }
      })
      // if no response received
      .catch(function (error) {
        console.log("something is wrong !");
      });
  };

  // myChangeHandler method - it is setting the state of properties with user entered values
  myChangeHandler = (event) => {
    this.setState({ category: event.target.value });
  };
  cleanText = () => {
    this.setState({ category: "" });
  }

  render() {
    console.log("category initial value : ", this.state.category );
    console.log("categoryExists initial value : ", this.state.categoryExists );

    // console.log(
    //   "categoryUpdateFunction in submit button",
    //   this.props,
    //   this.state
    //);
    //  const divStyle = {
    //   display : "flex",
    //   justifyContent : "center",
    //   alignItems : "center",
    //   paddingTop : "-20%",
    //   position : "relative"
    //   //  alignItems : "center",
    //   //  position : "fixed"
    // }
    //  const submitStyle = {
    //   display: "flex",
    //   justifyContent : "center",
    //   alignItems : "center",
    //   maxHeight : "20%",
    //   marginBottom : "20%",
    //   // backgroundColor : "blue",
    //   marginTop : "-10%",

    // }
    // const box = {
    //   display : "flex",
    //   justifyContent: "center",
    //   alignItems : "center",
    //   position : "relative"
    // }

    return (
      <div >
        {/* Pop up form starts  */}
        <form onSubmit={this.mySubmitHandler}>
          <div className = "enterCategoryText">
             <p className="divStyle">     {/*style = {divStyle}> */}
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
          <div className = "box" > { /*style = {box}>*/} 
            <input
              type="text"
              onClick = {this.cleanText}
              onChange={this.myChangeHandler}
              value={this.state.category}
            />
          </div>
          <br />
          <br />
          <br />
          {/* submit button  */}
          <div className= "submitStyle"> {/*style= {submitStyle}*/}
            <input type="submit" />
          </div>

          {/* <Timeline updateCategory= {this.state.category}/> */}
        </form>
        <div>
          {/* PopUp Form Ends */}
          {/* This text shows the current value of state categoryExists - null or Category alredy exists */}

          <h2>{this.state.categoryExists}</h2>
        </div>
      </div>
    );
    //    console.log("updatecategory:",this.state.category);
    //   <Timeline updateCategory= {this.state.category}/>
  }
}
export default SubmitButtonCategory;

// exporting SubmitButtonCategory component
