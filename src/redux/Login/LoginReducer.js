import { USER_VALIDITY_LOGIN, USER_ENTRIES_IN_LOGIN } from "./LoginType";

const initialLoggedInUser = {
  email: "", 
  password: "",
  loggedInUserCorrectly: "", // valid or invalid user
};

const loginReducer = (state = initialLoggedInUser, action) => {
  console.log("action login reducer", action.payload);

  switch (action.type) {
    case USER_VALIDITY_LOGIN:
      return {
        ...state,
        loggedInUserCorrectly: action.payload,
      };
    case USER_ENTRIES_IN_LOGIN:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

export default loginReducer;
