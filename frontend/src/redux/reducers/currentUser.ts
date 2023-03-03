import { initialState } from "../initState";
import { CurrentUserActionTypes } from "../actions/currentUser";
import { CurrentUserAction, IUser } from "../../types";

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

export default currentUserReducer;
