import Axios from "axios";

// Delete API call to delete category in the database
async function DeleteCategoryDeleteApi(category) {
  console.log("data received:", category);
  try {
    const response = await Axios({
      method: "delete",
      url: "http://localhost:8081/deleteCategory",
      data: category,
    });

    return response;
  } catch (err) {
    console.log("something is wrong !");
  }
}

// Post API call to add category in the database
async function AddCategoryPostApi(newCategory) {
  console.log("data received:", newCategory);
  try {
    const response = await Axios.post(
      `http://localhost:8081/addCategory`,
      newCategory
    );
    return response;
  } catch (err) {
    console.log("something is wrong !");
  }
}

// Post API call to save the upload post data in the database
async function UploadPostPostApi(formData) {
  console.log("data received:", formData);
  try {
    const response = await Axios({
      method: "post",
      url: "http://localhost:8081/uploadPost",
      data: formData,
      headers: { "content-type": "multipart/form-data" },
    });
    return response;
  } catch (err) {
    console.log("something is wrong !");
  }
}

// Post API call to add username in the database
async function AddUsernamePostApi(userEmail) {
  console.log("data received:", userEmail);
  try {
    const response = await Axios.post(
      `http://localhost:8081/addusername`,
      userEmail
    );
    return response;
  } catch (err) {
    console.log("something is wrong !");
  }
}

// Post API call for likes in upload post
async function LikesPostApi(userEmail) {
  console.log("data received in timeline js ", userEmail);
  try {
    const response = await Axios({
      method: "post",
      url: "http://localhost:8081/likes",
      data: userEmail,
    });
    console.log("response in timeline%%% .js", response.data);
    return response;
  } catch (err) {
    console.log("something is wrong - timeline.js !");
  }
}

// Post API call for comments in upload post
async function CommentsPostApi(userCommentedPost) {
  console.log("data received in timeline js ", userCommentedPost);
  try {
    const response = await Axios({
      method: "post",
      url: "http://localhost:8081/comments",
      data: userCommentedPost,
    });
    console.log("comments response ", response.data);
    return response;
  } catch (err) {
    console.log("something is wrong - timeline.js !");
  }
}

// Get API call to fetch category list from database
async function GetCategoryFetchApi() {
  try {
    const response = await fetch(`http://localhost:8081/getCategory`);
    const json = await response.json();
    console.log("category-----------json ", json);
    return json;
  } catch (err) {
    console.log("something is wrong !");
  }
}

// GET API call to fetch upload post data from database
async function GetUploadPostFetchApi() {
  try {
    const response = await fetch(`http://localhost:8081/getUploadPost`);
    const json = await response.json();
    return json;
  } catch (err) {
    console.log("something is wrong !");
  }
}

// Post API call to fetch single post data from the database
async function SinglePostPostApi(singlepostId) {
  console.log("data received in single post id", singlepostId);
  try {
    const requestOptions = {
      method: "post",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(singlepostId),
      //body: singlepostId,
    };
    // fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
    // .then(response => response.json())
    // .then(data => this.setState({ postId: data.id }));
    console.log("requestOptions",requestOptions);
    const response = await fetch(
      `http://localhost:8081/singlePost`,
      requestOptions
    );
    console.log("response in timeline singlepostapi",response);
    const json = await response.json();

    // const response = await Axios.post(
    //   `http://localhost:8081/singlePost`,
    //   singlepostId
    // );
    console.log("response in singlepost in timeline.js", json);
    return json;
  } catch (err) {
    console.log("something is wrong !");
  }
}

// Get API call to fetch username data from database
async function GetUsernameFetchApi() {
  try {
    const response = await fetch(`http://localhost:8081/getUsername`);
    const json = await response.json();
    console.log("userarray @@@", response, json);
    return json;
  } catch (err) {
    console.log("something is wrong !");
  }
}

export {
  DeleteCategoryDeleteApi,
  GetCategoryFetchApi,
  GetUploadPostFetchApi,
  AddCategoryPostApi,
  UploadPostPostApi,
  GetUsernameFetchApi,
  AddUsernamePostApi,
  LikesPostApi,
  CommentsPostApi,
  SinglePostPostApi,
};
