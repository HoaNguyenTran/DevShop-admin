import { pageConstants } from "../actions/constants";

const initialState = {
  error: null,
  loading: false,
  page: {},
};

const pageReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case pageConstants.CREATE_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case pageConstants.CREATE_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case pageConstants.CREATE_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    default:
        return state;
  }
  return state;
};

export default pageReducer;
