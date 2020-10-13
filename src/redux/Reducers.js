import registerReducer  from "./Register/RegisterReducer";
import loginReducer from "./Login/LoginReducer";
import timelineReducer from "./Timeline/TimelineReducer";


import { combineReducers } from "redux";

export default combineReducers({
  registerReducer,
  loginReducer,
  timelineReducer,
});
