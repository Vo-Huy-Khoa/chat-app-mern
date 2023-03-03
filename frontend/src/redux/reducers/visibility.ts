import { SelectVisibilityAction } from "../../types";
import { VisibilityActionTypes } from "../actions/visibility";
import { Visibility } from "../initState";

const currentVisibilityReducer = (
  state = Visibility,
  action: SelectVisibilityAction
) => {
  switch (action.type) {
    case VisibilityActionTypes.SET_VISIBILITY:
      return action.payload;
    case VisibilityActionTypes.CLEAR_VISIBILITY:
      return Visibility;
    default:
      return state;
  }
};

export default currentVisibilityReducer;
