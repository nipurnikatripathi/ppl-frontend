import { CATEGORY_ARRAY, SINGLE_POST } from "./TimelineType";
import { UPLOAD_POST_ARRAY} from "./TimelineType"

export const categoryArrayInTimelinePage = (userData) => {
  return {
    type: CATEGORY_ARRAY,
    info: "Redux action for input data in popup",
    payload: userData,
  };
};

export const uploadPostArrayInTimelinePage = (userData) => {
  return {
    type: UPLOAD_POST_ARRAY,
    info: "Redux action for input data in popup",
    payload: userData,
  };
};

export const singlePost = (userData) => {
  return {
    type: SINGLE_POST,
    info: "Redux action for input data in singlepost",
    payload: userData,
  };
};