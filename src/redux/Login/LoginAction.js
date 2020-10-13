import { USER_ENTRIES_IN_LOGIN, USER_VALIDITY_LOGIN } from "./LoginType";

export const userValidLoginPage = (userData) => {
  return {
    type: USER_VALIDITY_LOGIN,
    info: "Redux action for checking valid/invalid user",
    payload: userData,
  };
};

export const userEntriesInLoginPage = (userEntries) => {
  return {
    type: USER_ENTRIES_IN_LOGIN,
    info: "Redux action for input user entries",
    payload: userEntries,
  };
};
