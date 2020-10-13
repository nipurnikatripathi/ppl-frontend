import { CATEGORY_ARRAY, SINGLE_POST } from "./TimelineType";
import { UPLOAD_POST_ARRAY } from "./TimelineType";

const initialTimelineState = {
  categoryArray: [],
  uploadPostArray: [],
  singlePostArray:{},
};

const timelineReducer = (state = initialTimelineState, action) => {
  console.log("category array  and upload post array in  timeline reducer", action.payload);

  switch (action.type) {
    case CATEGORY_ARRAY:
      return {
        ...state,
        categoryArray: action.payload,
      };
      case UPLOAD_POST_ARRAY:
        return {
          ...state,
          uploadPostArray: action.payload,
        };
      case SINGLE_POST:
        return {
          ...state,
          singlePostArray: action.payload,
        }
  

    default:
      return state;
  }
};

export default timelineReducer;
