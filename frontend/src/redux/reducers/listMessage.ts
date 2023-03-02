import {
  SelectMessageAction,
  SelectMessageActionTypes,
} from "../actions/listMessage";
import { initMessage } from "../initState";

const currentMessageReducer = (
  state = initMessage,
  action: SelectMessageAction
) => {
  switch (action.type) {
    case SelectMessageActionTypes.SET_MESSAGE:
      return [...action.payload];
    case SelectMessageActionTypes.CLEAR_MESSAGE:
      return [...initMessage];
    default:
      return state;
  }
};

export default currentMessageReducer;
