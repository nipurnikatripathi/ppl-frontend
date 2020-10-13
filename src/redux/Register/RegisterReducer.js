import {
  USER_VALUES_REGISTRATION,
  USER_ENTRIES_IN_REGISTRATION,
} from "./RegisterType";

const initialRegisterUser = {
  username: "", 
  password: "", 
  email: "", 
  firstName: "", 
  lastName: "", 
  registerUser: "", // existing or new user 
};

const registerReducer = (state = initialRegisterUser, action) => {
 console.log("action Register reducer", action.payload);

  switch (action.type) {
    case USER_VALUES_REGISTRATION:
      return {
        ...state,
        registerUser: action.payload,
      };
    case USER_ENTRIES_IN_REGISTRATION:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

export default registerReducer;
