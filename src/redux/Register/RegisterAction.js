import {
  USER_ENTRIES_IN_REGISTRATION,
  USER_VALUES_REGISTRATION,
} from "./RegisterType";

export const userValidRegistrationPage = (userData) => {
  return {
    type: USER_VALUES_REGISTRATION,
    info: "Redux action for checking new/existing user",
    payload: userData,
  };
};

export const userEntriesInRegistrationPage = (userEntries) => {
  return {
    type: USER_ENTRIES_IN_REGISTRATION,
    info: "Redux action for input user entries",
    payload: userEntries,
  };
};
