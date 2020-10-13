import Axios from "axios";

// Post API call to register user in database
async function RegisterUserPostApi(user) {
  console.log("data received:", user);
  try {
    const response = await Axios.post(`http://localhost:8081/register`, user);
    return response;
  } catch (err) {
    console.log("something is wrong !");
  }
}

// Post API call to verify user from database for login
async function LoginUserPostApi(user) {
  console.log("data received:", user);
  try {
    const response = await Axios.post(`http://localhost:8081/login`, user);
    return response;
  } catch (err) {
    console.log("something is wrong !");
  }
}

export {RegisterUserPostApi,LoginUserPostApi};