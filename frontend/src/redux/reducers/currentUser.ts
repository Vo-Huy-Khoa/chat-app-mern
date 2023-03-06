import { initialState } from "../initState";
import { CurrentUserActionTypes } from "../actions/currentUser";
import { CurrentReceiverAction, CurrentUserAction, IUser } from "../../types";

const currentUserReducer = (
  state = initialState,
  action: CurrentUserAction
): IUser => {
  switch (action.type) {
    case CurrentUserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
      };
    case CurrentUserActionTypes.CLEAR_CURRENT_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const currentReceiverReducer = (
  state = initialState,
  action: CurrentReceiverAction
): IUser => {
  switch (action.type) {
    case CurrentUserActionTypes.SET_CURRENT_RECEIVER:
      return {
        ...state,
        ...action.payload,
      };
    case CurrentUserActionTypes.CLEAR_CURRENT_RECEIVER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export { currentUserReducer, currentReceiverReducer };
