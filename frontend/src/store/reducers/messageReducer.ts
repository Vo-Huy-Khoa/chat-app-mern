import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
} from "../actions/actionCreators";

const initialState = {
  messages: [],
  loading: false,
  error: "",
};

const messages = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload,
      };
    case FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default messages;
